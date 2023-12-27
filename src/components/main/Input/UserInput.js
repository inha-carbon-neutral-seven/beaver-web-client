import { Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FileInputButton from "./FileInputButton";
import { updateAppState } from "../../../reducers/appStateReducer";
import {
  setAIAnswer,
  setLoading,
  setMessage,
  setSentMessage,
} from "../../../reducers/chatScreenReducers";

// 사용자 메시지 input 컴포넌트
// 파일 input(FileInputButton.js), 메시지 input, 전송 버튼을 포함한다.
// 전송 버튼은 메시지 input만 전송한다.
function UserInput() {
  // App의 상태변수
  const currentState = useSelector((state) => state.appState.currentState);
  const isConnected = useSelector((state) => state.connected.isConnected);

  // 이 컴포넌트에서 사용할 상태변수들
  const loading = useSelector((state) => state.chatScreen.loading);
  const message = useSelector((state) => state.chatScreen.message);

  // dispatch
  const dispatch = useDispatch();

  // 채팅 메시지 전송 시
  const messageHandler = async (e) => {
    e.preventDefault();
    dispatch(updateAppState("message_sent"));

    if (!loading) {
      dispatch(setLoading(true));
      dispatch(setMessage(""));
      dispatch(setSentMessage(message));
      dispatch(setAIAnswer(""));

      try {
        const response = await fetch(
          "http://beaver7.duckdns.org:10100/generate",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: message,
            }),
          }
        )
          .then((res) => res.json())
          .then((res) => {
            dispatch(setAIAnswer(res.message));
            dispatch(updateAppState("response_received"));
            dispatch(updateAppState("message_waiting"));
            return res;
          });

        dispatch(updateAppState("response_wait"));
      } catch (error) {
        console.log("에러 발생", error);
      } finally {
        dispatch(setLoading(false));
      }
    }
  };

  return (
    /* 사용자 메시지 input */
    <div className="border-t border-gray-200 dark:border-gray-700 pt-2 w-full">
      <div className="flex items-center space-x-2 px-4">
        {/* 파일 input은 따로 만들어놓기 */}
        <FileInputButton />
        <form
          className="flex flex-grow"
          onSubmit={messageHandler}
          disabled={loading}
        >
          <input
            className="flex-grow rounded-lg w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            placeholder="Type your message"
            type="text"
            value={message}
            disabled={
              !isConnected ||
              currentState === "analyzing" ||
              currentState === "response_waiting"
            }
            onChange={(e) => dispatch(setMessage(e.target.value))}
          />
          <Button type="submit" variant="outline" className="ml-2">
            전송
          </Button>
        </form>
      </div>
    </div>
  );
}

export default UserInput;
