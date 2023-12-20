import { useSelector } from "react-redux";
import TypingAnimation from "./TypingAnimation";

// 채팅 log 컴포넌트
function ChatLogs() {
  // 이 컴포넌트에서 사용할 상태변수들
  const loading = useSelector((state) => state.chatScreen.loading);
  const chatlog = useSelector((state) => state.chatScreen.chatlog);
  
  return (
    /* 채팅 메시지 출력 */
    <div className="flex-grow overflow-y-auto">
      <ul className="list-none p-0 m-0">
        {chatlog.map((message, index) => (
          <li
            key={index}
            className={`p-3 m-5 rounded-md max-w-2/3 overflow-hidden ${
              message.user === "user"
                ? "bg-blue-200 ml-auto"
                : "bg-gray-200 ml-0"
            }`}
          >
            {<TypingAnimation text={message.message} />}
          </li>
        ))}
        {loading && (
          <li className="p-3 m-5 rounded-md max-w-2/3 overflow-hidden bg-gray-200 ml-0">
            {<TypingAnimation text={"메시지를 생성 중입니다..."} />}
          </li>
        )}
      </ul>
    </div>
  );
}

export default ChatLogs;
