import React, { useState } from "react";
import Papa from "papaparse";
import "./Data.css";

function DataToTable() {
  const [jsonData, setJsonData] = useState([]);
  const [error, setError] = useState("");
  const headers = jsonData.length > 0 ? Object.keys(jsonData[0]) : [];
  const handleFileChange = (e) => {
    setError("");
    const file = e.target.files[0];
    Papa.parse(file, {
      complete: (result) => {
        setJsonData(result.data);
      },
      header: true,
      error: (err) => {
        console.error(err);
        setError("Error parsing CSV file");
      },
    });
  };

  const handleJsonInput = (jsonInput) => {
    try {
      const json = JSON.parse(jsonInput);
      setJsonData(Array.isArray(json) ? json : [json]);
    } catch (e) {
      console.error(e);
      console.error("Invalid JSON input");
    }
  };

  const renderTable = (data) => {
    if (data.length === 0) return null;

    const headers = Object.keys(data[0]);
    return (
      <table className="data-table" border="1">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {headers.map((header) => (
                <td key={`${header}-${index}`}>{row[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <label htmlFor="csvInput">Upload CSV FILE:</label>
      <input
        id="csvInput"
        type="file"
        accept=".csv"
        onChange={handleFileChange}
      />
      <label htmlFor="jsonInput">Or Enter JSON Data:</label>
      <textarea
        id="jsonInput"
        placeholder="Enter JSON data"
        onBlur={(e) => handleJsonInput(e.target.value)}
      />
      {error && <p className="error-message">{error}</p>}
      {renderTable(jsonData)}
    </div>
  );
}

export default DataToTable;
