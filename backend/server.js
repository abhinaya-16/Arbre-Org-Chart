const express = require("express");
const cors = require("cors");
const ExcelJS = require("exceljs");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const app = express();
app.use(cors());

async function processExcel(buffer) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(buffer);

  const sheet = workbook.worksheets[0];

  // Get header row
  const headerRow = sheet.getRow(1);
  const headers = headerRow.values.map(h =>
    typeof h === "string" ? h.toLowerCase().trim() : h
  );

  const employees = [];
  sheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return; // skip header
    const obj = {};
    headers.forEach((header, index) => {
      if (!header) return;
      obj[header] = row.getCell(index).value;
    });

    employees.push({
      id: String(obj.id),
      parentId: obj.parentid ? String(obj.parentid) : null,
      firstName: obj.first_name,
      lastName: obj.last_name,
      department: obj.department_name,
      title: obj.title,
      name: `${obj.first_name} ${obj.last_name}`
    });
  });

  return employees;
}

app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).send("No file uploaded.");
    
    const employees = await processExcel(req.file.buffer);
    res.json(employees);
  } 
  catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Failed to process file" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});