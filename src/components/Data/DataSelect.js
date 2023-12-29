import Download from '../Utility/Download';
import Expand from '../Utility/Expand';
import Next from '../Utility/Next';
import React, { useState } from 'react';
import PrintFileCards from '../left-side/PrintFileCards';
import DataToTable from './DataToTable';
function DataSelect({ jsonData }) {
  const [error, setError] = useState('');
  const [selectedColumns, setSelectedColumns] = useState([]);

  const columnOptions =
    !jsonData || jsonData.length > 0 ? Object.keys(jsonData[0]) : [];
  const handleColumnChange = (event) => {
    const column = event.target.value;
    if (event.target.checked) {
      setSelectedColumns([...selectedColumns, column]);
    } else {
      setSelectedColumns(selectedColumns.filter((col) => col !== column));
    }
  };

  return (
    <div className="pb-6 border-solid max-h-[85vh] border-gray-300">
      <div className="flex flex-col overflow-auto">
        <div className="ml-auto space-x-2">
          <Download jsonData={jsonData} />
          <Expand
            className="cursor-pointer text-2xl select-none"
            title="전체화면"
          />
          <Next
            className="cursor-pointer text-2xl select-none"
            title="화면확장"
          />
        </div>
        <PrintFileCards processAll={false} />
        <div>
          {columnOptions.map((column) => (
            <div key={column}>
              <input
                type="checkbox"
                id={column}
                name={column}
                value={column}
                onChange={handleColumnChange}
              />
              <label htmlFor={column}>{column}</label>
            </div>
          ))}
        </div>
        {error && <div className="text-red-500"></div>}
      </div>
    </div>
  );
}

export default DataSelect;
