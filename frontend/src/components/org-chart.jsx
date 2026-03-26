import { useEffect, useRef } from "react";
import { OrgChart } from "d3-org-chart";

function OrgChartComponent({ data }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!data || data.length === 0) return;

    if (!chartRef.current) {
      chartRef.current = new OrgChart()
        .container("#chart")
        .nodeWidth(() => 260)
        .nodeHeight(() => 140)
        .childrenMargin(() => 60)
    }

    chartRef.current
      .data(data)
      .nodeContent((d) => {
        return `
          <div style="
            width: 240px;
            padding: 12px;
            border-radius: 12px;
            background: white;
            border: 1px solid #ddd;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            text-align: center;
            font-family: Arial;
          ">
            <div style="
              width: 40px;
              height: 40px;
              margin: 0 auto 8px;
              border-radius: 50%;
              background: #007bff;
              color: white;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
            ">
              ${d.data.name.charAt(0)}
            </div>

            <div style="font-weight: bold; font-size: 15px;">
              ${d.data.name}
            </div>

            <div style="font-size: 12px; color: #555;">
              ${d.data.title}
            </div>

            <div style="font-size: 11px; color: #999; margin-top: 4px;">
              ${d.data.department}
            </div>
          </div>
        `;
      })
      .render()
      .fit()

  }, [data]);

  return (
  <div
      id="chart"
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden", // D3-org-chart handles its own internal panning/scrolling
      }}
    ></div>
  );
}

export default OrgChartComponent;