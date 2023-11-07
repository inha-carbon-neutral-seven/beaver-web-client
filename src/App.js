import Sidebar from "./components/left-side/Sidebar";
import ChatScreen from "./components/main/ChatScreen";
import Header from "./components/top-side/Header";

function App() {
  return (
    <div>
      <Header />
      <Sidebar />
      <ChatScreen />
    </div>
  );
}

export default App;
