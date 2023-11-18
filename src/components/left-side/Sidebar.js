import { useSelector } from "react-redux";
import React, {useState, useEffect} from "react";
import Dashboard from "../Dash/Dashboard";
import Data from "../Data/Data";

function Sidebar({page}) {
  const anaylizedFileDataList = useSelector(
    (state) => state.chatScreen.anaylizedFileDataList
  );
  
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(200);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Attach window resize listener
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const minWidth = 200;
  const maxWidth = windowWidth * 0.75;
  const handleMouseDown  = (e) => {
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
      <aside className="w-64 bg-gray-200 dark:bg-gray-800 p-4 space-y-2 flex-shrink-0 cursor-col-resize" onMouseDown={handleMouseDown} style={{ width: `${width}px` }}>
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
        </div>
      </aside>
      </div>
  );
}
export default Sidebar;
