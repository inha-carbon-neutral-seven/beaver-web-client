import { useSelector } from 'react-redux';

function PrintFileCards({ processAll = true }) {
  const analyzedFileDataList = useSelector((state) => state.chatScreen.analyzedFileDataList);

  // Determine which list to process
  const dataListToProcess = processAll ? analyzedFileDataList : [analyzedFileDataList[analyzedFileDataList.length - 1]];

  return (
    <div>
      {dataListToProcess.map((analyzedFileData, index) => (
        <div
          key={index}
          className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow cursor-pointer dark:bg-gray-800 dark:border-gray-700"
          onClick={null} // Define your onClick behavior here
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
