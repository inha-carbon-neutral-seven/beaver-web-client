import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

function DataToTable({ jsonData }) {
  // Check if jsonData is empty
  if (jsonData.length === 0) {
    return (
      <div className="table-container">
        <p>No data available to display.</p>
      </div>
    );
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
    <div className="table-container" style={{ height: 400, width: '100%' }}>
      <h2>Data Table</h2>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        pageSizeOptions={[5, 10]}
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
