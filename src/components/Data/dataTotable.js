import React from 'react';
import './DataToTable.css';

function DataToTable({ jsonData }) {
  // Function to generate table headers
  const renderTableHeader = () => {
    if (jsonData.length === 0) {
      return null;
    }

    let headerKeys = Object.keys(jsonData[0]);
    return headerKeys.map((key, index) => (
      <th key={index} className="header">
        {key.replace('_', ' ')}
      </th>
    ));
  };

  // Function to generate table rows
  const renderTableRows = () => {
    return jsonData.map((item, index) => (
      <tr key={index}>
        {Object.keys(item).map((key) => (
          <td key={`${index}-${key}`} className="cell">
            {item[key]}
          </td>
        ))}
      </tr>
    ));
  };

  return (
    <div className="table-container">
      <h2>Data Table</h2>
      {jsonData.length > 0 ? (
        <table>
          <thead>
            <tr>{renderTableHeader()}</tr>
          </thead>
          <tbody>{renderTableRows()}</tbody>
        </table>
      ) : (
        <p>No data available to display.</p>
      )}
    </div>
  );
}

export default DataToTable;
