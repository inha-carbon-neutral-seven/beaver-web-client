import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Custom CodeBlock 컴포넌트
const CodeBlock = ({ inline, className, children }) => {
  const match = /language-(\w+)/.exec(className || '');
  const style = !inline && match ? {
    border: "0.5px solid #ddd",
    padding: "2px",
    borderRadius: "5px",
    background: "#333", // 어두운 배경색으로 변경
    color: "#fff", // 글자색을 흰색으로 변경
    overflowX: "scroll",
  } : {
    border: "0.5px solid #ddd",
    padding: "2px",
    borderRadius: "5px",
    background: "#333", // 어두운 배경색으로 변경
    color: "#fff", // 글자색을 흰색으로 변경
    overflowX: "scroll",
    marginBottom: "-4px",
    display: "inline-block",
  };

  return (
    <div 
    style={style}
    >
      <pre>
        <code>{children}</code>
      </pre>
    </div>
  );
};
const TableBlock = ({ children }) => {

  /**
   * TODO: 테이블 블록을 위한 마크다운 만들기 (타 소스 적극 활용 가능)
   */ 
  const style = {
    border: "0.5px solid #ddd",
    padding: "2px",
    borderRadius: "5px",
    background: "#333", // 어두운 배경색으로 변경
    color: "#fff", // 글자색을 흰색으로 변경
    overflowX: "scroll",
  };

  return (
    <div 
    style={style}
    >
      {children}
      
    </div>
  );
};

function TypingAnimation({ text }) {
  const [visibleText, setVisibleText] = useState("");
  const typingDelay = 20; // 타이핑 딜레이 시간(ms)

  useEffect(() => {
    // text에 <<SYS>>, <</SYS>> input이 있으면 제거하고 white space를 trim 함
    const trimmedText = text.replace(/<(<\/?)SYS>>/g, "").trim();

    const typeText = (currentIndex) => {
      if (currentIndex < trimmedText.length) {
        const currentChar = trimmedText[currentIndex];
        if (currentChar === "\n") {
          // 만약 현재 문자가 줄바꿈 문자라면 바로 적용
          setVisibleText((prevText) => prevText + "\n");
        } else {
          setVisibleText((prevText) => prevText + currentChar);
        }
        setTimeout(() => typeText(currentIndex + 1), typingDelay);
      }
    };

    typeText(0);
  }, [text]);

  return (
    <div className="overflow-x-scroll">
      <ReactMarkdown components={{ code: CodeBlock, table: TableBlock }} remarkPlugins={[remarkGfm]}>
        {visibleText}
      </ReactMarkdown>
    </div>
  );
}

export default TypingAnimation;
