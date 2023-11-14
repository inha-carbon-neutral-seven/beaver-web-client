import React from 'react';
import './detail.css';

function JsonToTable({ jsonData }) {
    // columns
    const headers = jsonData.length > 0 ? Object.keys(jsonData[0]) : [];

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
                {jsonData.map((row, index) => (
                    <tr key={index}>
                        {headers.map((header) => (
                            <td key={`${header}-${index}`}>{row[header]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default JsonToTable;