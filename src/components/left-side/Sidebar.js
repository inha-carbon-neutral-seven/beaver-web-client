import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import PrintFileCards from './PrintFileCards';
import DataSelect from '../Data/DataSelect';
import FileUploadToServer from '../main/Input/FileUploadToServer';

function Sidebar({ page, jsonData, setSidebarWidth }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(300);
  const [isVisible, setIsVisible] = useState(true);
  const isConnected = useSelector((state) => state.connected.isConnected);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    const debounce = (fn, ms) => {
      let timer;
      return (_) => {
        clearTimeout(timer);
        timer = setTimeout((_) => {
          timer = null;
          fn.apply(this, arguments);
        }, ms);
      };
    };
    const debouncedHandleResize = debounce(handleResize, 250);

    window.addEventListener('resize', debouncedHandleResize);
    return () => window.removeEventListener('resize', debouncedHandleResize);
  }, []);

  const minWidth = 200; // 최소 너비 설정
  const maxWidth = 400; // 최대 너비 설정

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

      if (newWidth <= minWidth) {
        setIsVisible(false); // 너비가 최소값 이하면 사이드바 숨김
      } else {
        setIsVisible(true); // 그렇지 않으면 표시
      }
    };
    const stopDrag = () => {
      document.removeEventListener('mousemove', doDrag);
    };
    document.addEventListener('mousemove', doDrag);
    document.addEventListener('mouseup', stopDrag, { once: true });
  };

  return (
    <div className="flex h-full">
      {isVisible && (
        <aside
          className="max-w-64 max-h-[90vh] p-1 backdrop-blur-xl bg-white/80 space-y-2 flex-shrink-0 drop-shadow-lg rounded-[12px]"
          style={{ width: `${width}px` }}
        >
          <div>
            {isConnected && <FileUploadToServer />}
            {page === 0 && <PrintFileCards jsonData={jsonData} />}
            {page === 1 && <DataSelect jsonData={jsonData} />}
            {page === 2 && <DataSelect jsonData={jsonData} />}
          </div>
        </aside>
      )}
      <div
        className="cursor-col-resize"
        style={{ width: '10px', cursor: 'col-resize' }}
        onMouseDown={handleMouseDown}
      ></div>
    </div>
  );
}
export default Sidebar;
