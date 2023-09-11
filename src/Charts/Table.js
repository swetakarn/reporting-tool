import React, { useState } from "react";
import Papa from 'papaparse'; 

function ExcelTable({ excelData }) {
  const [chartData, setChartData] = useState(null);
//DOWNLOAD TABLE DATA IN CSV FORMAT
  const downloadTabularData = () => {
    const csvData = Papa.unparse(excelData); // Assuming you have the 'papaparse' library installed
  
    // Create a Blob object with the CSV data
    const blob = new Blob([csvData], { type: 'text/csv' });
  
    // Create a temporary URL for the Blob
    const url = window.URL.createObjectURL(blob);
  
    // Create a link element and trigger a click event to download the file
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tabularData.csv'; // Set the desired file name
  
    // Trigger a click event to download the file
    a.click();
  
    // Release the object URL to free up memory
    window.URL.revokeObjectURL(url);
  };
  
  
  
  

  return (
    <>
      <table border={1}>
        <thead>
          <tr>
            {excelData.length > 0 &&
              Object.keys(excelData[0]).map((header, index) => (
                <th key={index}>{header}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {excelData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.values(row).map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <br />
      <button onClick={downloadTabularData}>Download Report</button>
    </>
  );
}

export default ExcelTable;
