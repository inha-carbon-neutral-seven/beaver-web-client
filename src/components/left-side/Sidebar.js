import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import PrintFileCards from './PrintFileCards';
import DataSelect from '../Data/DataSelect';

function Sidebar({ page, jsonData, setSidebarWidth }) {
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
      setSidebarWidth(newWidth);
    };

    document.addEventListener('mousemove', doDrag);
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', doDrag);
    });
  };

  return (
    <div className="flex h-full">
      <aside
        className="max-w-64 p-1 backdrop-blur-xl bg-white/80 space-y-2 flex-shrink-0 drop-shadow-lg rounded-[12px]"
        style={{ width: `${width}px` }}
      >
        <div>
          {page === 0 && <PrintFileCards jsonData={jsonData} />}
          {page === 1 && <DataSelect jsonData={jsonData} />}
          {page === 2 && <DataSelect jsonData={jsonData} />}
        </div>
      </aside>
      <div
        className="cursor-col-resize"
        style={{ width: '10px', cursor: 'col-resize' }}
        onMouseDown={handleMouseDown}
      ></div>
    </div>
  );
}
export default Sidebar;
