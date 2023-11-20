import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

const ServerStatusIndicator = () => {
  const isConnected = useSelector((state) => state.connected.isConnected);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkServerConnection = async () => {
      try {
        // console.log("서버 상태 확인 시도");
        // 서버에 핑 보내기
        const response = await fetch("http://beaver7.duckdns.org:44441/ping");

        // response.status === true : 웹, 모델 살아있음
        // response.status === false : 웹은 살고, 모델 죽음
        // 에러 404 : 웹 서버도 죽음.
        console.log("현재 상태", response.status);

        if (response.status) {
          // 서버로부터 응답이 오면 server state를 true로 변경
          dispatch({ type: "UPDATE_SERVER_STATE", payload: "full-connected" });
        } else {
          dispatch({ type: "UPDATE_SERVER_STATE", payload: "half-connected" });
        }
      } catch (error) {
        // 에러가 발생하면 server state를 false로 변경
        dispatch({ type: "UPDATE_SERVER_STATE", payload: "disconnected" });
      }
    };

    // 컴포넌트가 마운트되면 초기에 한 번 서버 상태를 확인
    checkServerConnection();

    // 일정 간격으로 서버 상태를 주기적으로 확인
    const intervalId = setInterval(checkServerConnection, 5000);

    // 컴포넌트가 언마운트되면 인터벌 클리어
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex ml-auto items-center space-x-4">
      <div className="inline bg-white rounded-lg p-2">
        {isConnected === "full-connected" && (
          <>
            <FontAwesomeIcon icon={faCircle} style={{ color: "green" }} />
            <span style={{ marginLeft: "5px", color: "green" }}>
              서버에 연결되었습니다
            </span>
          </>
        )}

        {isConnected === "half-connected" && (
          <>
            <FontAwesomeIcon icon={faCircle} style={{ color: "orange" }} />
            <span style={{ marginLeft: "5px", color: "orange" }}>
              모델 서버에 연결되지 않았습니다
            </span>
          </>
        )}

        {isConnected === "disconnected" && (
          <>
            <FontAwesomeIcon icon={faCircle} style={{ color: "red" }} />
            <span style={{ marginLeft: "5px", color: "red" }}>
              서버에 연결되지 않았습니다
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default ServerStatusIndicator;
