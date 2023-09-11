import React, { useState } from "react";
import * as XLSX from "xlsx";
import ExcelTable from "../Charts/Table";
import ChartComponent from "../Charts/ChartComponent"; // Import the new ChartComponent

function ExcelUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [excelData, setExcelData] = useState([]);
  const [chartType, setChartType] = useState("bar");
  const [chartData, setChartData] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const fileData = e.target.result;
        const workbook = XLSX.read(fileData, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        setExcelData(jsonData);

        // Extract field names, labels, and data for the chart
        const fieldNames = Object.keys(jsonData[0]);
        const fieldName = fieldNames[0]; // Change this to the field you want to use
        const dataCounts = {};

        jsonData.forEach((row) => {
          const fieldValue = row[fieldName];
          if (fieldValue) {
            if (dataCounts[fieldValue]) {
              dataCounts[fieldValue]++;
            } else {
              dataCounts[fieldValue] = 1;
            }
          }
        });

        const labels = Object.keys(dataCounts);
        const data = Object.values(dataCounts);

        const chartConfig = {
          labels,
          datasets: [
            {
              label: "Data",
              data,
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
              ],
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        };

        // Set the chart data in state
        setChartData(chartConfig);
      };

      reader.readAsBinaryString(selectedFile);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <br />
      <button onClick={handleUpload}>Tabular Form</button>
      <button onClick={() => setChartType("bar")}>Bar Chart</button>
      <button onClick={() => setChartType("pie")}>Pie Chart</button>
      <button onClick={() => setChartType("line")}>Line Chart</button>
      <button onClick={() => setChartType("doughnut")}>Doughnut Chart</button>
      <div className="text-center">
        {excelData.length > 0 && (
          <>
            <ExcelTable excelData={excelData} />
            {chartData && (
              <ChartComponent chartData={chartData} chartType={chartType} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ExcelUpload;
