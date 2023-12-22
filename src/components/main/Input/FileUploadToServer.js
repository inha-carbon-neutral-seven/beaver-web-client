import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAppState } from '../../../reducers/appStateReducer';
import { addAnalyzedFileData } from '../../../reducers/chatScreenReducers';

// 파일 업로드 후(아직 서버로 전송은 안한 상황), 사용자지정 이름 input 입력받기
// 이름을 입력 받은 후, server로 전송한다.
function FileUploadToServer() {
  // App의 상태변수
  const currentState = useSelector((state) => state.appState.currentState);

  // 이 컴포넌트에서 사용할 상태변수들
  const selectedFile = useSelector((state) => state.chatScreen.selectedFile);

  // 사용자 지정 데이터 이름
  const [dataName, setDataName] = useState('');

  // dispatch func
  const dispatch = useDispatch();

  // 파일 업로드 시, 전송
  const handleFileUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('description', dataName);

      dispatch(updateAppState('response_waiting'));

      // 서버로 FormData 전송, 응답 요청
      const response = await fetch('https://beaver7s.duckdns.org/upload', {
        method: 'POST',
        body: formData,
      })
        .then((res) => {
          console.log(res.body);
          // 응답을 받으면, 분석 요청
          dispatch(updateAppState('analyzing'));
          return fetch('https://beaver7s.duckdns.org/embed');
        })
        .then((res) => {
          // 분석이 끝났다는 요청을 받는다.
          dispatch(updateAppState('analyzed'));

          // 분석된 데이터를 받는다.
          // 여기서 뭔가 한다.

          // 분석 데이터 정보를 저장한다. (지금은 임시로 이름이나 크기같은 분석안해도 알수 있는거만 저장함.)
          const newAnalyzedFileData = {
            analyzedFileData_name: selectedFile.name,
            analyzedFileData_size: selectedFile.size, // Size in bytes
            userCustomName: dataName, // 사용자가 지정한 데이터 이름도 같이 저장한다.
          };

          // 분석 데이터를 리스트에 저장한다.
          dispatch(addAnalyzedFileData(newAnalyzedFileData));
        });

      // 서버 응답 처리
      console.log('파일 업로드 성공:', response);
    } catch (error) {
      console.error('파일 업로드 오류:', error);
    }
  };

  /* 파일 업로드 후(아직 서버로 전송은 안한 상황), 사용자지정 이름 input 입력받기*/
  /* 이후에 파일과 사용자 지정 이름을 같이 서버로 보낸다 */
  return currentState === 'file_uploading' ? (
    <div>
      <p>파일명: {selectedFile.name}</p>
      <p>파일크기: {`${selectedFile.size}byte`}</p>
      <p>데이터의 이름을 정해주세요.</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(updateAppState('file_sent'));
          handleFileUpload();
        }}
      >
        <input
          className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          type="text"
          onChange={(e) => setDataName(e.target.value)}
        ></input>

        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-0.5 px-0.5 border border-blue-500 hover:border-transparent ml-1 rounded"
          type="submit"
        >
          확인
        </button>
      </form>
    </div>
  ) : null;
}

export default FileUploadToServer;
