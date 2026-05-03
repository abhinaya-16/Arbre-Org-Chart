import azure.functions as func
import json
import os
import uuid
import pyodbc
import pandas as pd
import io
from azure.storage.blob import BlobServiceClient, BlobClient

app = func.FunctionApp()

# -------------------------------
# Upload File (FIXED)
# -------------------------------
@app.route(route="UploadFile", methods=["POST"])
def upload_file(req: func.HttpRequest) -> func.HttpResponse:
    try:
        user_id = req.headers.get("x-user-id")
        if not user_id:
            return func.HttpResponse("Missing user ID", status_code=400)

        # 1. Get the file from the form-data
        # Postman sends files in the 'files' dictionary of the request
        file = req.files.get('file')
        
        if not file:
            return func.HttpResponse("No file found in request (ensure key is 'file')", status_code=400)

        # 2. Capture the actual filename
        actual_filename = file.filename  # This gets 'Abhinaya_employees.xlsx'
        file_bytes = file.read()
        file_size = len(file_bytes)

        file_id = str(uuid.uuid4())
        blob_name = f"{user_id}/{file_id}.xlsx"

        blob_service = BlobServiceClient.from_connection_string(
            os.environ["BLOB_CONN"]
        )

        blob_client = blob_service.get_blob_client(
            container="excel-files",
            blob=blob_name
        )

        blob_client.upload_blob(file_bytes, overwrite=True)
        blob_url = blob_client.url

        # 3. Save the actual_filename and file_size to the database
        conn = pyodbc.connect(os.environ["SQL_CONN"])
        cursor = conn.cursor()

        cursor.execute("""
            INSERT INTO Files (id, user_id, filename, blob_url, file_size)
            VALUES (?, ?, ?, ?, ?)
        """, file_id, user_id, actual_filename, blob_url, file_size)

        conn.commit()

        return func.HttpResponse(blob_url, status_code=200)

    except Exception as e:
        return func.HttpResponse(f"Upload failed: {str(e)}", status_code=500)


# -------------------------------
# Get Files
# -------------------------------
@app.route(route="GetFiles", methods=["GET"])
def get_files(req: func.HttpRequest) -> func.HttpResponse:
    try:
        user_id = req.headers.get("x-user-id")

        conn = pyodbc.connect(os.environ["SQL_CONN"])
        cursor = conn.cursor()

        cursor.execute("""
            SELECT id, filename, blob_url, upload_time, file_size
            FROM Files
            WHERE user_id = ?
            ORDER BY upload_time DESC
        """, user_id)

        rows = cursor.fetchall()

        def format_size(bytes):
            for unit in ['B', 'KB', 'MB', 'GB']:
                if bytes < 1024:
                    return f"{bytes:.1f} {unit}"
                bytes /= 1024

        result = [
            {
                "id": str(r[0]),
                "filename": r[1],
                "url": r[2],
                "time": r[3].isoformat(),
                "size": format_size(r[4]) if r[4] else "0 B"
            }
            for r in rows
        ]

        return func.HttpResponse(json.dumps(result), mimetype="application/json")

    except Exception as e:
        return func.HttpResponse(str(e), status_code=500)


# -------------------------------
# Get Employees
# -------------------------------
@app.route(route="GetEmployees", methods=["GET"])
def get_employees(req: func.HttpRequest) -> func.HttpResponse:
    try:
        file_url = req.params.get("fileUrl")
        if not file_url:
            return func.HttpResponse("Missing fileUrl", status_code=400)

        blob_service = BlobServiceClient.from_connection_string(os.environ["BLOB_CONN"])

        # URL parsing to get container and blob names
        from urllib.parse import urlparse
        path = urlparse(file_url).path.lstrip('/')
        parts = path.split('/')
        container_name = parts[0]
        blob_name = "/".join(parts[1:])

        blob_client = blob_service.get_blob_client(container=container_name, blob=blob_name)
        
        stream = blob_client.download_blob().readall()
        excel_file = io.BytesIO(stream)
        
        # Read Excel and standardize column names
        df = pd.read_excel(excel_file, engine="openpyxl")
        df.columns = [str(col).lower().strip() for col in df.columns]

        # Helper function to fix Excel numeric IDs being read as floats (e.g., 100.0 -> "100")
        def clean_id(val):
            if pd.isna(val) or str(val).lower() == 'nan' or str(val).strip() == '':
                return None
            try:
                # If it's a float or int, convert to int then string
                if isinstance(val, (float, int)):
                    return str(int(val))
                # If it's a string that looks like "100.0", cast to float then int
                float_val = float(val)
                return str(int(float_val))
            except:
                # Fallback for non-numeric strings
                return str(val).strip()

        employees = []
        for _, row in df.iterrows():
            emp_id = clean_id(row.get("id"))
            parent_id = clean_id(row.get("parentid"))

            # D3-org-chart requires a valid ID for every node
            if not emp_id:
                continue

            employees.append({
                "id": emp_id,
                "parentId": parent_id, # Root node will correctly be None
                "name": f"{row.get('first_name', '')} {row.get('last_name', '')}".strip(),
                "title": row.get("title", "N/A"),
                "department": row.get("department_name", "N/A")
            })

        return func.HttpResponse(
            json.dumps(employees), 
            mimetype="application/json", 
            status_code=200
        )

    except Exception as e:
        return func.HttpResponse(f"Error processing Excel: {str(e)}", status_code=500)