import './Data.css';
import DataToTable from "./dataTotable"
import {Expand, Download, Next} from "../../icons"
function Data() {
    return (
        <div classname="pb-6 border-solid border-gray-300">
            <div classname="flex flex-col max-h-[85vh] overflow-auto border border-gray-300 rounded-md">
                <div className='flex flex-none items-center p-6'>
                    <h4 className='flex-auto whitespace-nowrap overflow-hidden overflow-ellipsis'></h4>
                    <Download className='flex ml-2 cursor-pointer text-2xl select-none'/>
                    <Expand className='flex ml-2 cursor-pointer  text-2xl select-none'/>
                    <Next className='flex ml-2 cursor-pointer text-2xl select-none'/>
                </div>
                <div></div>
                <DataToTable />
            </div>
        </div>
        
    );
}

export default Data;
