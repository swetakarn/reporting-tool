import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function ChartComponent({ chartData, chartType }) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
//DOWNLOAD THE GIVEN CHART REPORT 
const downloadChartImage = () => {
    if (chartRef.current) {
      const canvas = chartRef.current;
      const image = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = image;
      link.download = "chart.png";
      link.click();
    }
  };
  useEffect(() => {
    if (chartRef.current && chartData) {
      if (chartInstanceRef.current) {
        // If a chart instance exists, destroy it before creating a new one
        chartInstanceRef.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");

      const newChartInstance = new Chart(ctx, {
        type: chartType, // Use the provided chart type
        data: chartData,
      });

      // Store the chart instance in the ref
      chartInstanceRef.current = newChartInstance;
    }
  }, [chartData, chartType]);

  return<> <canvas ref={chartRef}></canvas>
      <button onClick={downloadChartImage}>Download Chart</button>
  </>
  
}

export default ChartComponent;
