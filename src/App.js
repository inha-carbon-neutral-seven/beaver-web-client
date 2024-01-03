import React, { useState, useEffect } from 'react';
import csvtojson from 'csvtojson';
import Sidebar from './components/left-side/Sidebar';
import ChatScreen from './components/main/ChatScreen';
import Header from './components/top-side/Header';
import DashScreen from './components/Data/DashScreen';
import DataToTable from './components/Data/DataToTable';
import { ExampleData } from './components/Data/Chart/ChartExample';

function App() {
  const [showComponent, setShowComponent] = useState(0);
  const [fileData, setFileData] = useState(null);
  const [jsonData, setJsonData] = useState([]);
  const [error, setError] = useState('');
  const [sidebarWidth, setSidebarWidth] = useState(300);

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
  const chatScreenStyle = showComponent === 0 ? { flexGrow: 1 } : {};

  return (
    <div className="w-full h-screen bg-gradient-to-br from-beaver-3 to-beaver-lightbrown flex flex-col overflow-y-auto">
      <Header param={handlePage} />

      <div className="flex flex-grow mt-20 mb-2 pt-1 pb-1 w-4/5 place-self-center">
        <div className="fixed-left h-full">
          <Sidebar
            page={showComponent}
            jsonData={jsonData}
            setSidebarWidth={setSidebarWidth}
          />
        </div>

        <div className="flex-grow">
          <div className="w-full h-full pl-0 space y-2 rounded-[12px]">
            {showComponent === 0 && (
              <ChatScreen fileData={fileData} onFileChange={handleFileChange} />
            )}
            {showComponent === 1 && <DashScreen jsonData={jsonData} />}
            {showComponent === 2 && <DataToTable jsonData={jsonData} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
