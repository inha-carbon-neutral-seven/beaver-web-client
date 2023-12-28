import Sidebar from "./components/left-side/Sidebar";
import ChatScreen from "./components/main/ChatScreen";
import Header from "./components/top-side/Header";
import DashScreen from "./components/Data/DashScreen";
import DataToTable from "./components/Data/DataToTable";
import React, { useState, useEffect } from "react";

import csvtojson from "csvtojson";

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


  const handlePage = (p) => {
    setShowComponent(p);
  };
  const chatScreenStyle = showComponent === 0 ? { flexGrow: 1 } : {};


  const handleFileChange = (file) => {
    console.log('File selected:', file); // Log the selected file
    setFileData(file);
  };



  return (
    <div className="w-full h-screen bg-gradient-to-br from-beaver-3 to-beaver-lightbrown flex flex-col">
      <Header param={handlePage} />
      <div className="flex flex-grow pt-16 mt-1">


        <Sidebar page={showComponent} jsonData={jsonData}/>
        <div className="rounded-md flex-grow py-2 pr-2 mr-40 mb-3" style={chatScreenStyle}>
          {showComponent === 0 && <ChatScreen fileData={fileData} onFileChange={handleFileChange} />}
          {showComponent === 1 && <DashScreen jsonData={jsonData} selectedColumns={selectedColumns} />}
          {showComponent === 2 && <DataToTable jsonData={jsonData} selectedColumns={selectedColumns} />}
        </div>
      </div>
    </div>
  );
}

export default App;
