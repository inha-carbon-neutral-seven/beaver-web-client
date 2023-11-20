import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import TypingAnimation from './TypingAnimation';
import Button from '@mui/material/Button';

function ChatScreen() {
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
      dispatch({
        type: 'ADD_TO_CHATLOG',
        payload: { user: 'user', message: sentMessage },
      });
    }
  }, [sentMessage]);

  // ai 메시지를 chatlog에 추가
  useEffect(() => {
    if (aiAnswer) {
      dispatch({
        type: 'ADD_TO_CHATLOG',
        payload: { user: 'ai', message: aiAnswer },
      });
    }
  }, [aiAnswer]);

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
      const response = await fetch('http://beaver7.duckdns.org:10100/upload', {
        method: 'POST',
        body: formData,
      })
        .then((res) => {
          console.log(res.body);
          // 응답을 받으면, 분석 요청
          dispatch({ type: 'UPDATE_APP_STATE', payload: 'analyzing' });
          return fetch('http://beaver7.duckdns.org:10100/embed');
        })
        .then((res) => {
          // 분석이 끝났다는 요청을 받는다.
          dispatch({ type: 'UPDATE_APP_STATE', payload: 'analyzed' });
          // 분석된 데이터를 받는다.
          // 여기서 뭔가 한다.

          // 분석 데이터 정보를 저장한다. (지금은 임시로 이름이나 크기같은 분석안해도 알수 있는거만 저장함.)
          const newAnaylizedFileData = {
            anaylizedFileData_name: selectedFile.name,
            anaylizedFileData_size: selectedFile.size, // Size in bytes
            userCustomName: dataName, // 사용자가 지정한 데이터 이름도 같이 저장한다.
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
      {isConnected && (
        <div>
          {/* 파일 업로드 버튼 */}
          {currentState === 'init' && (
            <div>
              <p>파일을 업로드하려면 버튼을 누르세요</p>
              <input type="file" onChange={handleFileChange} ref={fileInput} style={{ display: 'none' }} />
              <button
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                onClick={openFileInput}
              >
                업로드
              </button>
            </div>
          )}

          {/* 파일 업로드 후(아직 서버로 전송은 안한 상황), 사용자지정 이름 input 입력받기*/}
          {/* 이후에 파일과 사용자 지정 이름을 같이 서버로 보낸다 */}
          {currentState === 'file_uploading' && (
            <div>
              <p>파일명: {selectedFile.name}</p>
              <p>파일크기: {`${selectedFile.size}byte`}</p>
              <p>데이터의 이름을 정해주세요.</p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  dispatch({ type: 'UPDATE_APP_STATE', payload: 'file_sent' });
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
          )}
        </div>
      )}

      <Loader currentState={currentState} />
      {currentState === 'analyzed' && <div>파일 분석 완료!</div>}

      <div className="flex-grow flex flex-col justify-between">
        {/* 채팅 메시지 출력 */}
        <div className="flex-grow overflow-y-auto">
          <ul className="list-none p-0 m-0">
            {chatlog.map((message, index) => (
              <li
                key={index}
                className={`p-3 m-5 rounded-md max-w-1/3 overflow-hidden ${
                  message.user === 'user' ? 'bg-blue-200 ml-auto' : 'bg-gray-200 ml-0'
                }`}
              >
                {<TypingAnimation text={message.message} />}
              </li>
            ))}
            {loading && (
              <li className="p-3 m-5 rounded-md max-w-1/3 overflow-hidden bg-gray-200 ml-0">
                {<TypingAnimation text={'메시지를 생성중입니다...'} />}
              </li>
            )}
          </ul>
        </div>

        {/* 사용자 메시지 input */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
          <div className="flex items-center space-x-2 px-4">
            <form className="flex flex-grow" onSubmit={messageHandler} disabled={loading}>
              <input
                className="flex-grow rounded-lg w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                placeholder="Type your message"
                type="text"
                value={message}
                disabled={!isConnected || currentState === 'analyzing' || currentState === 'response_waiting'}
                onChange={(e) => dispatch({ type: 'SET_MESSAGE', payload: e.target.value })}
              />
              <Button type="submit" variant="outline" className="ml-2">
                전송
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ChatScreen;
