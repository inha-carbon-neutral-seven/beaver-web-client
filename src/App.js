import Sidebar from "./components/left-side/Sidebar";
import ChatScreen from "./components/main/ChatScreen";
import Header from "./components/top-side/Header";
import Data from "./components/Data/Data";
import Dashboard from "./components/Dash/Dashboard";
import React, {useState} from "react";

function App() {
  const [showComponent, setShowComponent] = useState(0);
  const handlePage = (p) => {
    setShowComponent(p);
    console.log(showComponent);
  }
  return (
    <div className="w-full h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header param={handlePage}/>
      <div className="flex flex-grow mt-16">
        <Sidebar />
        <ChatScreen />
        {showComponent == 1 && <Dashboard />}
        {showComponent == 2 && <Data />}
      </div>
    </div>
  );
}

export default App;
