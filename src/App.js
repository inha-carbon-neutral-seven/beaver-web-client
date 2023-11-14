import Sidebar from "./components/left-side/Sidebar";
import ChatScreen from "./components/main/ChatScreen";
import Header from "./components/top-side/Header";

function App() {
  return (
    <div className="w-full h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      <div className="flex flex-grow mt-16">
        <Sidebar />
        <ChatScreen />
      </div>
    </div>
  );
}

export default App;
