import Sidebar from './components/left-side/Sidebar';
import ChatScreen from './components/main/ChatScreen';
import Header from './components/top-side/Header';
import CSVLoader from './components/Data/CSVLoader';
import React, { useState, useEffect } from 'react';

function App() {
  const [csvData, setCSVData] = useState(null);
  const [jsonData, setJSONData] = useState(null);

  const handleCSVDataChange = (jsonArray) => {
    setJSONData(jsonArray);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setCSVData(e.target.result);
    };

    reader.readAsText(file);
  };

  const convertCSVData = async () => {
    if (csvData) {
      const csvLoader = new CSVLoader({ onCSVDataChange: handleCSVDataChange });
      csvLoader.convertCSVToJson(csvData);
    }
  };

  useEffect(() => {
    convertCSVData();
  }, [csvData]);

  const [showComponent, setShowComponent] = useState(0);
  const handlePage = (p) => {
    setShowComponent(p);
  };
  const chatScreenStyle = showComponent === 0 ? { flexGrow: 1 } : {};

  return (
    <div className="w-full h-screen bg-gradient-to-br from-beaver-3 to-beaver-lightbrown flex flex-col">
      <Header param={handlePage} />
      <div className="flex flex-grow pt-16 mt-1">
        <Sidebar page={showComponent} />
        <div
          className="rounded-md flex-grow py-2 pr-2 mr-40 mb-3"
          style={chatScreenStyle}
        >
          <ChatScreen fileData={jsonData} onFileChange={handleFileChange} />
        </div>
      </div>
    </div>
  );
}

export default App;
