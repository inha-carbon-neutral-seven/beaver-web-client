import Sidebar from "./components/left-side/Sidebar";
import ChatScreen from "./components/main/ChatScreen";
import Header from "./components/top-side/Header";
import React, { useState } from "react";

function App() {
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
        <div className="rounded-md flex-grow p-2" style={chatScreenStyle}>
          <ChatScreen />
        </div>
      </div>
    </div>
  );
}

export default App;
