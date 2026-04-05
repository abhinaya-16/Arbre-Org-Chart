import { useState, useEffect } from "react";
import OrgChartComponent from "./components/org-chart";
import Navbar from "./components/navbar";
import './OrgChartPage.css'

function OrgChartPage() {
  const [employees, setEmployees] = useState([]);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/employees")
      .then(res => res.json())
      .then(data => setEmployees(data));
  }, []);

  return (
    <div className="full-page">
        <Navbar 
          chartInstance={chartInstance} 
          data={employees}
          onDataUpload={setEmployees}
        />
        <OrgChartComponent 
          className="org-chart" 
          data={employees} 
          setChartInstance={setChartInstance}
        />
    </div>
        
  );
}

export default OrgChartPage;