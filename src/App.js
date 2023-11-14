import Sidebar from "./components/left-side/Sidebar";
import ChatScreen from "./components/main/ChatScreen";
import Header from "./components/top-side/Header";
import Data from "./components/details/Data";
import Dashboard from "./components/dash/Dashboard"
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
      <Sidebar />
      <Routes>
        <Route path="/" element={<ChatScreen/>}/>
        {/* <Route path="/dashboard" element={<Dashboard/>}/> */}
        <Route path="/data" element={<Data />} />

      </Routes>
    </Router>
  );
}


export default App;
