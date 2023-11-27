import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import Loader from "./Loader";
import ChatLogs from "./ChatLogs";
import UserInput from "./Input/UserInput";
import FileUploadToServer from "./Input/FileUploadToServer";
import { addToChatLog } from "../../reducers/chatScreenReducers";

function ChatScreen() {
  // App의 상태변수
  const currentState = useSelector((state) => state.appState.currentState);
  const isConnected = useSelector((state) => state.connected.isConnected);

  // 이 컴포넌트에서 사용할 상태변수들
  const sentMessage = useSelector((state) => state.chatScreen.sentMessage);
  const aiAnswer = useSelector((state) => state.chatScreen.aiAnswer);

  // dispatch func
  const dispatch = useDispatch();

  // 사용자 메시지를 chatlog에 추가
  useEffect(() => {
    if (sentMessage) {
      dispatch(addToChatLog("user", sentMessage));
    }
  }, [sentMessage]);

  // ai 메시지를 chatlog에 추가
  useEffect(() => {
    if (aiAnswer) {
      dispatch(addToChatLog("ai", aiAnswer));
    }
  }, [aiAnswer]);

  return (
    <div className="flex-grow flex flex-col bg-white dark:bg-gray-800 p-4 h-full">
      {/* 파일 업로드 후(아직 서버로 전송은 안한 상황), 사용자지정 이름 input 입력받기 */}
      {/* 이후에 파일과 사용자 지정 이름을 같이 서버로 보낸다 */}
      {isConnected && <FileUploadToServer />}

      {/* 파일 전송 관련 로딩 메시지 표시 */}
      <Loader currentState={currentState} />

      <div className="flex-grow flex flex-col justify-between">
        {/* 채팅 메시지 출력 */}
        <ChatLogs />
        {/* 사용자 메시지 input */}
        <UserInput />
      </div>
    </div>
  );
}
export default ChatScreen;
