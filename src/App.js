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
    <div className="w-full h-screen  bg-beaver-bg flex flex-col overflow-y-scroll">
      <Header param={handlePage} />
      <div className="flex flex-grow pt-16 mt-1">
        <Sidebar page={showComponent} />
        <div
          className="rounded-md flex-grow py-2 pr-2 mr-40 mb-3"
          style={chatScreenStyle}
        >
          <ChatScreen />
        </div>
      </div>
    </div>
  );
}

export default App;
