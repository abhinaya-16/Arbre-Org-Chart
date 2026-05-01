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
# Upload File
# -------------------------------
@app.route(route="UploadFile", methods=["POST"])
def upload_file(req: func.HttpRequest) -> func.HttpResponse:
    try:
        user_id = req.headers.get("x-user-id")

        if not user_id:
            return func.HttpResponse("Missing user ID", status_code=400)

        file_bytes = req.get_body()

        if not file_bytes:
            return func.HttpResponse("No file received", status_code=400)

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

        conn = pyodbc.connect(os.environ["SQL_CONN"])
        cursor = conn.cursor()

        cursor.execute("""
            INSERT INTO Files (id, user_id, filename, blob_url)
            VALUES (?, ?, ?, ?)
        """, file_id, user_id, "uploaded.xlsx", blob_url)

        conn.commit()

        return func.HttpResponse(blob_url, status_code=200)

    except Exception as e:
        return func.HttpResponse(str(e), status_code=500)


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
            SELECT id, filename, blob_url, upload_time
            FROM Files
            WHERE user_id = ?
            ORDER BY upload_time DESC
        """, user_id)

        rows = cursor.fetchall()

        result = [
            {
                "id": str(r[0]),
                "filename": r[1],
                "url": r[2],
                "time": str(r[3])
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

        # More robust URL parsing
        from urllib.parse import urlparse
        path = urlparse(file_url).path.lstrip('/')
        parts = path.split('/')
        container_name = parts[0]
        blob_name = "/".join(parts[1:])

        blob_client = blob_service.get_blob_client(container=container_name, blob=blob_name)
        
        stream = blob_client.download_blob().readall()
        excel_file = io.BytesIO(stream)
        
        # Standardize column names to lowercase to avoid KeyErrors
        df = pd.read_excel(excel_file, engine="openpyxl")
        df.columns = [str(col).lower().strip() for col in df.columns]

        employees = []
        for _, row in df.iterrows():
            # Using .get() or checking existence to prevent crashes if a column is missing
            employees.append({
                "id": str(row.get("id", "")),
                "parentId": str(row["parentid"]) if pd.notna(row.get("parentid")) else None,
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