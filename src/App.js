import React, { useState, useEffect } from 'react';
import csvtojson from 'csvtojson';
import Sidebar from './components/left-side/Sidebar';
import ChatScreen from './components/main/ChatScreen';
import Header from './components/top-side/Header';
import DashScreen from './components/Data/DashScreen';
import DataToTable from './components/Data/DataToTable';

function App() {
  const [showComponent, setShowComponent] = useState(0);
  const [fileData, setFileData] = useState(null);
  const [jsonData, setJsonData] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [error, setError] = useState('');
  const handleColumnsChange = (columns) => {
    setSelectedColumns(columns);
  };
  useEffect(() => {
    if (!fileData) {
      console.log('No file provided');
      return;
    }

    const reader = new FileReader();

    reader.onload = async (e) => {
      console.log('FileReader onload triggered');
      const csvText = e.target.result;

      try {
        const jsonArray = await csvtojson().fromString(csvText);
        console.log('CSV to JSON conversion successful:', jsonArray);
        setJsonData(jsonArray);
      } catch (error) {
        console.error('Error converting CSV to JSON', error);
        setError('Error converting CSV to JSON');
      }
    };

    reader.readAsText(fileData);
  }, [fileData]);

  const handleFileChange = (file) => {
    console.log('File selected:', file); // Log the selected file
    setFileData(file);
  };

  const handlePage = (p) => {
    setShowComponent(p);
  };

  return (
    <div className="w-full h-screen bg-gray-50 dark-bg-gray-900 flex flex-col">
      <Header param={handlePage} />
      <div className="flex flex-grow pt-16">
        <Sidebar page={showComponent} jsonData={jsonData} columns={handleColumnsChange} />
        {showComponent === 0 && <ChatScreen fileData={fileData} onFileChange={handleFileChange} />}
        {showComponent === 1 && <DashScreen jsonData={jsonData} selectedColumns={selectedColumns} />}
        {showComponent === 2 && <DataToTable jsonData={jsonData} selectedColumns={selectedColumns} />}
      </div>
    </div>
  );
}

export default App;
