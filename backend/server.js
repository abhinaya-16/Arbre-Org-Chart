const express = require("express");
const cors = require("cors");
const ExcelJS = require("exceljs");

const app = express();
app.use(cors());

async function readExcel() {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile("./employees.xlsx");

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

app.get("/api/employees", async (req, res) => {
  try {
    const employees = await readExcel();
    res.json(employees);
  } catch (error) {
    console.error("Error reading Excel:", error);
    res.status(500).json({ error: "Failed to read Excel file" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});