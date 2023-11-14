import React, { useState } from 'react';
import Papa from 'papaparse';
import './DataToTable.css'

function DataToTable() {
    const [jsonData, setJsonData] = useState([]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        Papa.parse(file, {
            complete: (result) => {
                setJsonData(result.data);
            },
            header: true
        });
    };

    const handleJsonInput = (jsonInput) => {
        try {
            const json = JSON.parse(jsonInput);
            setJsonData(Array.isArray(json) ? json : [json]);
        } catch (e) {
            console.error("Invalid JSON input");
        }
    };

    const renderTable = (data) => {
        if (data.length === 0) return null;

        const headers = Object.keys(data[0]);
        return (
            <table border="1">
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
            <input type="file" accept=".csv" onChange={handleFileChange} />
            <textarea placeholder="Enter JSON data" onBlur={(e) => handleJsonInput(e.target.value)} />
            {renderTable(jsonData)}
        </div>
    );
}

export default DataToTable;