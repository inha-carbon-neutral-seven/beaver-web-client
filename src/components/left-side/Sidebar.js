import { useEffect } from "react";
import { useSelector } from "react-redux";

function Sidebar() {
  const anaylizedFileDataList = useSelector(
    (state) => state.chatScreen.anaylizedFileDataList
  );

  return (
    <aside className="w-64 bg-gray-200 dark:bg-gray-800 p-4 space-y-2">
      {anaylizedFileDataList.map((anaylizedFileData, index) => (
        <div key={index}>
          <p>파일명: {anaylizedFileData.anaylizedFileData_name}</p>
          <p>파일크기: {`${anaylizedFileData.anaylizedFileData_size}byte`}</p>
          <p>사용자 지정 데이터 이름 : {anaylizedFileData.userCustomName}</p>
        </div>
      ))}
    </aside>
  );
}
export default Sidebar;