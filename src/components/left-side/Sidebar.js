import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
<<<<<<< Updated upstream
import Dashboard from '../Data/Dash/Dashboard';
import Data from '../Data/Data';

function Sidebar({ page }) {
  const anaylizedFileDataList = useSelector((state) => state.chatScreen.anaylizedFileDataList);

=======
import PrintFileCards from './PrintFileCards';
import DataSelect from '../Data/DataSelect';
function Sidebar({ page, jsonData }) {
>>>>>>> Stashed changes
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(400);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Attach window resize listener
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove the event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const minWidth = 400;
  const maxWidth = windowWidth * 0.5;
  const handleMouseDown = (e) => {
    const startWidth = width;
    const startPosition = e.clientX;

    const doDrag = (e) => {
      const delta = startPosition - e.clientX;
      const newWidth = Math.min(Math.max(startWidth - delta, minWidth), maxWidth);
      setWidth(newWidth);
    };

    document.addEventListener('mousemove', doDrag);
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', doDrag);
    });
  };

  return (
    <div className="flex">
      <aside className="w-64 bg-gray-200 dark:bg-gray-800 p-4 space-y-2 flex-shrink-0 " style={{ width: `${width}px` }}>
<<<<<<< Updated upstream
        {anaylizedFileDataList.map((anaylizedFileData, index) => (
          <div key={index}>
            <p>파일명: {anaylizedFileData.anaylizedFileData_name}</p>
            <p>파일크기: {`${anaylizedFileData.anaylizedFileData_size}byte`}</p>
            <p>사용자 지정 데이터 이름 : {anaylizedFileData.userCustomName}</p>
          </div>
        ))}
        <div>
          {page === 1 && <Dashboard />}
          {page === 2 && <Data />}
=======
        <div>
          {page === 0 && <PrintFileCards />}
          {page === 1 && <DataSelect jsonData={jsonData} />}
          {page === 2 && <DataSelect jsonData={jsonData} />}
>>>>>>> Stashed changes
        </div>
      </aside>
      <div
        className="cursor-col-resize"
        style={{ width: '5px', cursor: 'col-resize' }}
        onMouseDown={handleMouseDown}
      ></div>
    </div>
  );
}
export default Sidebar;
