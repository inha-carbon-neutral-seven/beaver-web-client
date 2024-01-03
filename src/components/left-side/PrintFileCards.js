import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Download from '../Utility/Download';
import { Closeicon } from '../../icons';
function PrintFileCards({ processAll = true, jsonData = [] }) {
  const dispatch = useDispatch();
  const analyzedFileDataList = useSelector(
    (state) => state.chatScreen.analyzedFileDataList
  );

  const [clickedIndex, setClickedIndex] = useState(null);
  const handleCardClick = (index) => {
    setClickedIndex(index);
  };

  const handleDelete = (event, index) => {
    event.stopPropagation();
    const updatedList = analyzedFileDataList.filter((_, i) => i !== index);
    dispatch({ type: 'UPDATE_ANALYZED_FILE_DATA_LIST', payload: updatedList });
  };

  const dataListToProcess = processAll
    ? analyzedFileDataList
    : [analyzedFileDataList[analyzedFileDataList.length - 1]];

  return (
    <div>
      {dataListToProcess.map((analyzedFileData, index) => (
        <div
          key={index}
          className={`max-w-full p-3 border border-gray-200 rounded-lg shadow cursor-pointer mb-3 dark:bg-gray-800 dark:border-gray-700 ${
            clickedIndex === index ? 'bg-blue-500 text-white' : 'bg-white'
          } break-words flex flex-col `}
          onClick={() => handleCardClick(index)}
        >
          <div className="ml-auto space-x-2">
            <Download jsonData={jsonData} />
            <Closeicon onClick={(event) => handleDelete(event, index)} />
          </div>
          <p>파일명: {analyzedFileData?.analyzedFileData_name}</p>
          <p>파일크기: {`${analyzedFileData?.analyzedFileData_size}byte`}</p>
          <p>사용자 지정 데이터 이름 : {analyzedFileData?.userCustomName}</p>
        </div>
      ))}
    </div>
  );
}

export default PrintFileCards;
