const express = require("express");
const cors = require("cors");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");

const upload = multer({ storage: multer.memoryStorage() });

const app = express();
app.use(cors());

const AZURE_BASE = "http://localhost:7071/api";

// ------------------------
// Upload File
// ------------------------
app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];
    if (!req.file) return res.status(400).send("No file uploaded.");

    const formData = new FormData();
    formData.append("file", req.file.buffer, req.file.originalname);

    const response = await axios.post(
      `${AZURE_BASE}/UploadFile`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          "x-user-id": userId
        }
      }
    );

    res.json({
      url: response.data,
      filename: req.file.originalname
    });

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send("Upload failed");
  }
});

// ------------------------
// Get Files
// ------------------------
app.get("/api/files", async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];
    const response = await axios.get(`${AZURE_BASE}/GetFiles`, {
      headers: {
        "x-user-id": userId
      }
    });

    res.json(response.data);

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send("Failed to fetch files");
  }
});

// ------------------------
// Get Employees
// ------------------------
app.get("/api/employees", async (req, res) => {
  try {
    const fileUrl = req.query.fileUrl;

    const response = await axios.get(`${AZURE_BASE}/GetEmployees`, {
      params: { fileUrl }
    });

    res.json(response.data);

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send("Failed to fetch employees");
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

// ------------------------
// Delete File
// ------------------------
app.delete("/api/files/:id", async (req, res) => {
  try {
    const fileId = req.params.id;
    const userId = req.headers["x-user-id"];
    await axios.delete(`${AZURE_BASE}/DeleteFile/${fileId}`, {
      headers: { "x-user-id": userId }
    });
    res.status(200).send("Deleted");
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send("Failed to delete file");
  }
});