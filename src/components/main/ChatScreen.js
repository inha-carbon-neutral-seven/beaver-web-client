import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import styles from "./ChatScreen.module.css";

function ChatScreen() {
  // redux 사용
  const loading = useSelector((state) => state.loading);
  const message = useSelector((state) => state.message);
  const sentMessage = useSelector((state) => state.sentMessage);
  const aiAnswer = useSelector((state) => state.aiAnswer);
  const chatlog = useSelector((state) => state.chatlog);

  const isExpanded = useSelector((state) => state.isExpanded);

  const messageHandler = (e) => {
    e.preventDefault();
    if (!loading) {
      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "SET_MESSAGE", payload: "" });
      dispatch({ type: "SET_SENT_MESSAGE", payload: message });
      dispatch({ type: "SET_AIANSWER", payload: "" });

      try {
        dispatch({ type: "SET_AIANSWER", payload: `답변 ${message}` });
      } catch (error) {
        console.log("에러 발생", error);
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    }
  };

  useEffect(() => {
    if (sentMessage && aiAnswer) {
      dispatch({
        type: "ADD_TO_CHATLOG",
        payload: { user: "user", message: sentMessage },
      });
      dispatch({
        type: "ADD_TO_CHATLOG",
        payload: { user: "ai", message: aiAnswer },
      });
    }
  }, [sentMessage, aiAnswer]);

  const dispatch = useDispatch();
  return (
    <div className={!isExpanded ? styles.chat : styles.chat_full}>
      <ul className={styles.chat_log}>
        {chatlog.map((message, index) => (
          <li
            key={index}
            className={`${styles["chat_message"]} ${styles[message.user]}`}
          >
            {message.message}
          </li>
        ))}
      </ul>

      <form
        className={styles.user_input_container}
        onSubmit={messageHandler}
        disabled={loading}
      >
        <input
          className={styles.user_input}
          type="text"
          value={message}
          //onChange={(e) => setMessage(e.target.value)}
          onChange={(e) =>
            dispatch({ type: "SET_MESSAGE", payload: e.target.value })
          }
        />
        <button type="submit">전송</button>
      </form>
    </div>
  );
}
export default ChatScreen;
