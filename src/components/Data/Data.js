import './Data.css';
import { Expand, Download, Next } from '../../icons';
import React, { useState } from 'react';
import CSVLoader from './CSVLoader';
import Dashboard from './Dash/Dashboard';
import DataToTable from './DataToTable';

function Data() {
  const [jsonData, setJsonData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const handleFileChange = (file) => {
    setSelectedFile(file);
  };
  return (
    <div className="pb-6 border-solid max-h-[85vh] border-gray-300">
      <div className="flex flex-col overflow-auto">
        <div>
          <CSVLoader
            onCSVDataChange={(file, jsonData) => {
              console.log('CSV FILE: ', file);
              console.log('JSON Data: ', jsonData);
              setJsonData(jsonData);
            }}
            onError={(errorMsg) => setError(errorMsg)}
          />
        </div>
        <div className="flex flex-none items-center p-6 border border-gray-300 rounded-md">
          <span>
            <strong>{selectedFile ? selectedFile.name : '파일을 선택해주세요'}</strong>
          </span>
          <div className="ml-auto space-x-2">
            <Download className="cursor-pointer text-2xl select-none" title="다운로드" />
            <Expand className="cursor-pointer text-2xl select-none" title="전체화면" />
            <Next className="cursor-pointer text-2xl select-none" title="화면확장" />
          </div>
        </div>
        {error && <div className="text-red-500"></div>}
        <div>
          <DataToTable jsonData={jsonData} />
          <Dashboard jsonData={jsonData} />
        </div>
      </div>
    </div>
  );
}

export default Data;
