import { useState, useEffect } from "react";
import OrgChartComponent from "../components/org-chart";
import Navbar from "../components/navbar";
import './OrgChartPage.css'

function OrgChartPage() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/employees")
      .then(res => res.json())
      .then(data => setEmployees(data));
  }, []);

  return (
    <div className="full-page">
        <Navbar />
        <OrgChartComponent className="org-chart" data={employees} />
    </div>
        
  );
}

export default OrgChartPage;