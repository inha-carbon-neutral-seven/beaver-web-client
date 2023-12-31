import * as React from 'react';
import { ExampleData } from './Chart/ChartExample';
import { DataGrid } from '@mui/x-data-grid';

function DataToTable({ jsonData }) {
  // Make sure jsonData is not undefined or null
  if (!jsonData || jsonData.length === 0) {
    return <div>No data available</div>;
  }

  // Create columns from jsonData keys
  const columns = Object.keys(jsonData[0]).map((key) => ({
    field: key,
    headerName: key.replace('_', ' '),
    width: 150,
  }));

  // Use jsonData as rows
  const rows = jsonData.map((item, index) => ({
    id: index,
    ...item,
  }));

  return (
    <div
      className="table-container flex-grow flex flex-col bg-white dark:bg-gray-800 p-4 h-full drop-shadow-lg w-full rounded-[12px] mt-3"
      style={{ height: 500, width: '100%' }}
    >
      <h2>Data Table</h2>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5, 10]}
        checkboxSelection
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
      />
    </div>
  );
}

export default DataToTable;
