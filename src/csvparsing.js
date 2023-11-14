import React, { useState } from 'react';
import Papa from 'papaparse';

function CsvToTable() {
    const [data, setData] = useState([]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        Papa.parse(file, {
            complete: (result) => {
                setData(result.data);
            },
            header: true
        });
    };

    return (
        <div>
            <input type="file" accept=".csv" onChange={handleFileChange} />
            {data.length > 0 && <Table data={data} />}
        </div>
    );
}

function Table({ data }) {
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
}

export default CsvToTable;
