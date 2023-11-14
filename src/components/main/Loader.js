function Loader({ currentState }) {
  const messages = [
    "파일을 전송 중입니다...",
    "파일 전송 성공!\n파일을 분석중입니다...",
  ];
  return (
    <div>
      {currentState === "response_waiting" && <p>{messages[0]}</p>}
      {currentState === "analyzing" && <p>{messages[1]}</p>}
    </div>
  );
}

export default Loader;
