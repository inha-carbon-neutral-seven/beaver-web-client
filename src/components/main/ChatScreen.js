import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import Loader from './Loader';
import ChatLogs from './ChatLogs';
import UserInput from './Input/UserInput';
import FileUploadToServer from './Input/FileUploadToServer';
import { addToChatLog } from '../../reducers/chatScreenReducers';

function ChatScreen({ fileData, onFileChange }) {
  // App의 상태변수
  const currentState = useSelector((state) => state.appState.currentState);
  const isConnected = useSelector((state) => state.connected.isConnected);

  // 이 컴포넌트에서 사용할 상태변수들
  const loading = useSelector((state) => state.chatScreen.loading);
  const message = useSelector((state) => state.chatScreen.message);
  const sentMessage = useSelector((state) => state.chatScreen.sentMessage);
  const aiAnswer = useSelector((state) => state.chatScreen.aiAnswer);
  const chatlog = useSelector((state) => state.chatScreen.chatlog);
  const selectedFile = useSelector((state) => state.chatScreen.selectedFile);

  // 사용자 지정 데이터 이름
  const [dataName, setDataName] = useState('');

  const fileInput = React.createRef();

  // 채팅 메시지 전송 시
  const messageHandler = async (e) => {
    e.preventDefault();
    dispatch({ type: 'UPDATE_APP_STATE', payload: 'message_sent' });

    if (!loading) {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_MESSAGE', payload: '' });
      dispatch({ type: 'SET_SENT_MESSAGE', payload: message });
      dispatch({ type: 'SET_AIANSWER', payload: '' });

      try {
        const response = await fetch('http://beaver7.duckdns.org:10100/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: message,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            dispatch({ type: 'SET_AIANSWER', payload: res.message });
            dispatch({
              type: 'UPDATE_APP_STATE',
              payload: 'response_received',
            });
            dispatch({ type: 'UPDATE_APP_STATE', payload: 'message_waiting' });
            return res;
          });
        dispatch({ type: 'UPDATE_APP_STATE', payload: 'response_wait' });

        // dispatch({ type: "UPDATE_APP_STATE", payload: "response_wait" });
        // dispatch({ type: "SET_AIANSWER", payload: `답변 ${message}` });
        // dispatch({ type: "UPDATE_APP_STATE", payload: "response_received" });
        // dispatch({ type: "UPDATE_APP_STATE", payload: "message_waiting" });
      } catch (error) {
        console.log('에러 발생', error);
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    }
  };

  // 사용자 메시지를 chatlog에 추가
  useEffect(() => {
    if (sentMessage) {
      dispatch(addToChatLog('user', sentMessage));
    }
  }, [sentMessage, dispatch]); // dispatch를 의존성 배열에 추가

  // ai 메시지를 chatlog에 추가
  useEffect(() => {
    if (aiAnswer) {
      dispatch(addToChatLog('ai', aiAnswer));
    }
  }, [aiAnswer, dispatch]); // dispatch를 의존성 배열에 추가

  //////////상태변화 확인//////////////
  // useEffect(() => {
  //   console.log("디스패치 후 : ", currentState);
  // }, [currentState]);
  ////////////////////////

  const dispatch = useDispatch();

  // 파일 업로드 버튼 클릭 시
  const openFileInput = () => {
    fileInput.current.click();
  };

  // 파일 업로드 시
  const handleFileChange = (e) => {
    dispatch({ type: 'SET_SELECTEDFILE', payload: e.target.files[0] });
    dispatch({ type: 'UPDATE_APP_STATE', payload: 'file_uploading' });
  };

  // 파일 업로드 시, 전송
  const handleFileUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('description', dataName);

      dispatch({ type: 'UPDATE_APP_STATE', payload: 'response_waiting' });

      // 서버로 FormData 전송, 응답 요청
      //const response = await fetch("http://13.124.82.89:55461/upload", {
      const response = await fetch('http://beaver7.duckdns.org:10100/upload', {
        method: 'POST',
        body: formData,
      })
        .then((res) => {
          console.log(res.body);
          // 응답을 받으면, 분석 요청
          dispatch({ type: 'UPDATE_APP_STATE', payload: 'analyzing' });
          //return fetch("http://13.124.82.89:55461/embed");
          return fetch('http://beaver7.duckdns.org:10100/embed');
        })
        .then((res) => {
          // 분석이 끝났다는 요청을 받는다.
          dispatch({ type: 'UPDATE_APP_STATE', payload: 'analyzed' });
          // 분석된 데이터를 받는다.
          // 여기서 뭔가 한다.

          // 분석 데이터 정보를 저장한다.
          const newAnaylizedFileData = {
            anaylizedFileData_name: selectedFile.name,
            anaylizedFileData_size: selectedFile.size, // Size in bytes
            userCustomName: dataName,
          };

          // 분석 데이터를 리스트에 저장한다.
          dispatch({
            type: 'ADD_ANALYZED_FILE_DATA',
            payload: {
              anaylizedFileData: newAnaylizedFileData,
            },
          });
        });

      // 서버 응답 처리
      console.log('파일 업로드 성공:', response);
    } catch (error) {
      console.error('파일 업로드 오류:', error);
    }
  };

  return (
    <div className="flex-grow flex flex-col bg-white dark:bg-gray-800 p-4 h-full">
      {/* 파일 업로드 관련 컴포넌트 */}
      {isConnected && <FileUploadToServer fileData={fileData} onFileChange={onFileChange} />}

      <Loader currentState={currentState} />
      {currentState === 'analyzed' && <div>파일 분석 완료!</div>}

      <div className="flex-grow flex flex-col justify-between">
        {/* 채팅 메시지 출력 */}
        <ChatLogs />
        {/* 사용자 메시지 input */}
        <UserInput fileData={fileData} onFileChange={onFileChange} />
      </div>
    </div>
  );
}

export default ChatScreen;
