import { useState } from 'react';
import { useSelector } from 'react-redux';

function PrintFileCards({ processAll = true }) {
  const analyzedFileDataList = useSelector(
    (state) => state.chatScreen.analyzedFileDataList
  );

  const [clickedIndex, setClickedIndex] = useState(null);
  const handelCardClick = (index) => {
    setClickedIndex(index);
  };
  const dataListToProcess = processAll
    ? analyzedFileDataList
    : [analyzedFileDataList[analyzedFileDataList.length - 1]];

  return (
    <div>
      {dataListToProcess.map((analyzedFileData, index) => (
        <div
          key={index}
          className={`max-w-sm p-6 border border-gray-200 rounded-lg shadow cursor-pointer mb-3 dark:bg-gray-800 dark:border-gray-700 ${
            clickedIndex === index ? 'bg-blue-500 text-white' : 'bg-white'
          } break-words`}
          onClick={() => handelCardClick(index)}
        >
          <p>파일명: {analyzedFileData.analyzedFileData_name}</p>
          <p>파일크기: {`${analyzedFileData.analyzedFileData_size}byte`}</p>
          <p>사용자 지정 데이터 이름 : {analyzedFileData.userCustomName}</p>
        </div>
      ))}
    </div>
  );
}

export default PrintFileCards;
