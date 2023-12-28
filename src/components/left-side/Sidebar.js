import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import PrintFileCards from './PrintFileCards';
import DataSelect from '../Data/DataSelect';

function Sidebar({ page, jsonData }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(300);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Attach window resize listener
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove the event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const minWidth = 300;
  const maxWidth = windowWidth * 0.5;
  const handleMouseDown = (e) => {
    const startWidth = width;
    const startPosition = e.clientX;

    const doDrag = (e) => {
      const delta = startPosition - e.clientX;
      const newWidth = Math.min(
        Math.max(startWidth - delta, minWidth),
        maxWidth
      );
      setWidth(newWidth);
    };

    document.addEventListener('mousemove', doDrag);
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', doDrag);
    });
  };

  return (
    <div className="flex">
      <aside
        className="w-64 bg-white dark:bg-gray-800 p-4 space-y-2 flex-shrink-0 drop-shadow-lg ml-40 mt-5 mb-2 rounded-[12px]"
        style={{ width: `${width}px` }}
      >
        <div>
          {page === 0 && <PrintFileCards />}
          {page === 1 && <DataSelect jsonData={jsonData} />}
          {page === 2 && <DataSelect jsonData={jsonData} />}
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
