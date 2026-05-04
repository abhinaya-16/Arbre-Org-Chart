import { useEffect, useRef } from "react";
import { OrgChart } from "d3-org-chart";
import * as d3 from "d3";

function OrgChartComponent({ data, setChartInstance }) {
  const chartRef = useRef(null);
  const d3ContainerRef = useRef(null);

  useEffect(() => {
    // console.log("Org Chart received data:", data);-- Debug log to check data format in console of inspector.
    if (!data || data.length === 0) return;

    const hasRoot = data.some(
      (d) => d.parentId === null || d.parentId === undefined || d.parentId === ""
    );

    if (!hasRoot) {
      console.error("Org Chart Error: No root node found (node with no parentId). Ensure your Excel has one row with an empty parent ID.");
      return;
    }

    const container = d3ContainerRef.current;
    const containerHeight = container ? container.offsetHeight : 565;

    try {
      if (!chartRef.current) {
        chartRef.current = new OrgChart()
          .container(d3ContainerRef.current) // Using Ref instead of ID selector
          .nodeWidth(() => 240)
          .nodeHeight(() => 140)
          .svgHeight(565)
          .childrenMargin(() => 60)
          .nodeUpdate(function (d) {
            const isHighlighted = d.data._highlighted || d.data._upToTheRootHighlighted;

            d3.select(this)
              .select(".node-rect")
              .attr("width", 240)
              .attr("height", 122)
              .attr("x", 0)
              .attr("y", 0)
              .attr("rx", 12)
              .attr("stroke", isHighlighted ? "#000000" : "none") //<=
              .attr("stroke-width", isHighlighted ? 5 : 0)
              .attr("fill", "transparent");
          })
          .linkUpdate(function (d) {
            d3.select(this)
              .attr("stroke", d.data._upToTheRootHighlighted ? "#000000" : "#E4E2E9")
              .attr("stroke-width", d.data._upToTheRootHighlighted ? 3 : 1);

            if (d.data._upToTheRootHighlighted) {
              d3.select(this).raise();
            }
          })
          .connectionsUpdate(function (d) {
            d3.select(this)
              .attr("stroke", "#000000")
              .attr("stroke-width", "3")
              .attr("marker-start", `url(#${d.from + "_" + d.to})`)
              .attr("marker-end", `url(#arrow-${d.from + "_" + d.to})`);
          })
          .defs(function (state, visibleConnections) {
            return `<defs>
              ${visibleConnections
                .map((conn) => {
                  const labelWidth = this.getTextWidth(conn.label, {
                    ctx: state.ctx,
                    fontSize: 2,
                    defaultFont: state.defaultFont,
                  });
                  return `
                  <marker id="${conn.from + "_" + conn.to}" refX="${
                    conn._source.x < conn._target.x ? -7 : 7
                  }" refY="5" markerWidth="500" markerHeight="500" orient="${
                    conn._source.x < conn._target.x ? "auto" : "auto-start-reverse"
                  }">
                    <rect rx=0.5 width=${
                      conn.label ? labelWidth + 3 : 0
                    } height=3 y=1 fill="#000000"></rect>
                    <text font-size="2px" x=1 fill="white" y=3>${conn.label || ""}</text>
                  </marker>
                  <marker id="arrow-${
                    conn.from + "_" + conn.to
                  }" markerWidth="500" markerHeight="500" refY="2" refX="1" orient="${
                    conn._source.x < conn._target.x ? "auto" : "auto-start-reverse"
                  }">
                    <path d='M0,0 V4 L2,2 Z' fill='#FF0000' />
                  </marker>
                `;
                })
                .join("")}
            </defs>`;
          })
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
                background: linear-gradient(115deg, #3b82f6, #8b5cf6);
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
              ">
                ${d.data.name ? d.data.name.charAt(0) : "?"}
              </div>
              <div style="font-weight: bold; font-size: 15px;">${d.data.name}</div>
              <div style="font-size: 12px; color: #555;">${d.data.title}</div>
              <div style="font-size: 11px; color: #999; margin-top: 4px;">${d.data.department}</div>
            </div>
          `;
          });

        if (setChartInstance) {
          setChartInstance(chartRef.current);
        }
      }

      chartRef.current
        .data(data)
        .svgHeight(containerHeight)
        .render()
        .fit();

    } catch (err) {
      console.error("D3 Org Chart failed to render. Check for circular dependencies or broken parent/child links:", err);
    }

    const handleResize = () => {
      if (chartRef.current && d3ContainerRef.current) {
        const newHeight = d3ContainerRef.current.offsetHeight;
        chartRef.current.svgHeight(newHeight).render().fit();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [data, setChartInstance]);

  return (
    <div
      ref={d3ContainerRef}
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundColor: "white",
      }}
    ></div>
  );
}

export default OrgChartComponent;