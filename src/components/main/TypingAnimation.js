import React, { useState, useEffect } from "react";

function TypingAnimation({ text }) {
  const [visibleText, setVisibleText] = useState("");
  const typingDelay = 20; // 타이핑 딜레이 시간(ms)

  useEffect(() => {
    
    // text에 <<SYS>>, <</SYS>> input이 있으면 제거하고 white space를 trim 함
    const trimmedText = text.replace(/<(<\/?)SYS>>/g, '').trim();

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

  return <div style={{ whiteSpace: "pre-line" }}>{visibleText}</div>;
}

export default TypingAnimation;
