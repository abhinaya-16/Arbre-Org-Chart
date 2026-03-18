import { useState, useEffect } from "react";
import OrgChartComponent from "../components/org-chart";
import './OrgChartPage.css'

function OrgChartPage() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/employees")
      .then(res => res.json())
      .then(data => setEmployees(data));
  }, []);

  return (
    <div class="full-page">
        <h2>Org-Chart</h2>
        <OrgChartComponent data={employees} />
    </div>
  );
}

export default OrgChartPage;