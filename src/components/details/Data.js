import './Data.css';
import DataToTable from "./dataTotable"
import {Expand, Download, Next} from "../../icons"
function Data() {
    return (
        <div classname="pb-6 border-b border-gray-300">
            <div classname="relative overflow-x-hidden my-4">
                <div classname="flex w-full border-0 rounded-md">
                    <div classname="flex-auto min-w-0">
                        <div classname="flex flex-col max-h-[85vh] overflow-auto border border-gray-300 rounded-md">
                            <div className='flex flex-none items-center p-6'>
                                <h4 className='flex-auto whitespace-nowrap overflow-hidden overflow-ellipsis'></h4>
                                <Download className='flex ml-2 cursor-pointer text-gray-700 text-2xl select-none'/>
                                <Expand className='flex ml-2 cursor-pointer text-gray-700 text-2xl select-none'/>
                                <Next className='flex ml-2 cursor-pointer text-gray-700 text-2xl select-none'/>
                            </div>
                            <div></div>
                            <DataToTable />
                        </div>
                        
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default Data;
