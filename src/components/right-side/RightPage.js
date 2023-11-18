import Data from "../Data/Data";
import Dashboard from "../Dash/Dashboard";
import React from "react";
import { render } from 'react-dom'
import App from './App'

function RightPage(){ 
    return(
        <Routes>
            <Route path="/data" element={<Data />} /> {/* Use element prop */}
            <Route path="/dash" element={<Dashboard />} /> {/* Use element prop */}
        </Routes>
    );
    
}
export default RightPage()

