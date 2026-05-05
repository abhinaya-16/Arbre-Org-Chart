import pyodbc
import os

try:
    conn = pyodbc.connect(os.environ["SQL_CONN"])
    print("CONNECTED SUCCESSFULLY")

    cursor = conn.cursor()
    cursor.execute("SELECT 1")
    print("QUERY WORKS")

except Exception as e:
    print("CONNECTION FAILED:")
    print(e)