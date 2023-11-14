import Sidebar from "./components/left-side/Sidebar";
import ChatScreen from "./components/main/ChatScreen";
import Header from "./components/top-side/Header";
import Data from "./components/details/Data";
import {
  BrowserRouter as Router ,
  Routes,
  Route,
  Link,
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/chat">
          {/* <div className="w-full h-screen bg-gray-50 dark:bg-gray-900 flex flex-col"> 
            <div className="flex flex-grow mt-16">
              <Sidebar />
              <ChatScreen />
            </div>
          </div> */}
        </Route>
        <Route path="/dashboard">
            
        </Route>
        <Route path="/data" element={<Data />} />

      </Routes>
    </Router>
  );
}


export default App;
