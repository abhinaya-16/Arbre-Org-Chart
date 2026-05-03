import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import OrgChartComponent from "./components/org-chart";
import Navbar from "./components/navbar";
import './OrgChartPage.css'

function OrgChartPage() {
  const location = useLocation();
  const fileUrl = location.state?.fileUrl;
  const [employees, setEmployees] = useState([]);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (!fileUrl) return;

    fetch(`http://localhost:5000/api/employees?fileUrl=${encodeURIComponent(fileUrl)}`)
      .then(res => res.json())
      .then(data => setEmployees(data))
      .catch(() => console.error("Failed to fetch employees"));
  }, [fileUrl]);

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