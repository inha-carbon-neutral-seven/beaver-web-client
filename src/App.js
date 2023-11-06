import Sidebar from "./components/side/Sidebar";
import styles from "./App.module.css";
import MainChat from "./components/main/MainChat";
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [sentMessage, setSentMessage] = useState("");
  const [aianswer, setAianswer] = useState("");
  const [chatlog, setChatlog] = useState([]); // [ {user: "user", message: "message"}, {user: "ai", message: "message"}

  const messageHandler = (e) => {
    e.preventDefault();
    if (!loading) {
      setLoading(true);
      setMessage("");
      setSentMessage(message);
      setAianswer("");

      try {
        setAianswer(`답변 ${message}`);
      } catch (error) {
        console.log("에러 발생", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (sentMessage && aianswer) {
      setChatlog((prevLog) => [
        ...prevLog,
        { user: "user", message: sentMessage },
        { user: "ai", message: aianswer },
      ]);
    }
  }, [sentMessage, aianswer]);

  return (
    <div>
      <Sidebar />
      <div className={styles.chat}>
        {chatlog.map((message, index) => (
          <div key={index}>{message.message}</div>
        ))}
      </div>

      <form
        className={styles.user_input}
        onSubmit={messageHandler}
        disabled={loading}
      >
        <div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">전송</button>
        </div>
      </form>
    </div>
  );
}

export default App;
