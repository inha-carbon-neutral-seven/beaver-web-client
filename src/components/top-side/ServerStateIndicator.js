<<<<<<< Updated upstream
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
=======
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { updateServerState } from '../../reducers/serverConnectReducer';
>>>>>>> Stashed changes

const ServerStatusIndicator = () => {
  const isConnected = useSelector((state) => state.connected.isConnected);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkServerConnection = async () => {
      try {
        // 서버에 핑 보내기
<<<<<<< Updated upstream
        // const response = await fetch(
        //   "http://13.124.82.89:55461/query?query=hello"
        // );
        const response = await fetch(
          "http://beaver7.duckdns.org:10100/ping"
        );

        // response.status === true : 웹, 모델 살아있음
        // response.status === false : 웹은 살고, 모델 죽음
        // 에러 뭐 404 뭐 그런거 : 웹 서버도 죽음.
        console.log("현재 상태", response.status);
        // if (response.ok) {
        if (response.status) {
          // 서버로부터 응답이 오면 server state를 true로 변경
          dispatch({ type: "UPDATE_SERVER_STATE", payload: "full-connected" });
        } else {
          dispatch({ type: "UPDATE_SERVER_STATE", payload: "half-connected" });
        }
      } catch (error) {
        // 에러가 발생하면 server state를 false로 변경
        dispatch({ type: "UPDATE_SERVER_STATE", payload: "disconnected" });
=======
        const response = await fetch('http://beaver7s.duckdns.org/ping');

        // response.status === true : 웹, 모델 살아있음
        // response.status === false : 웹은 살고, 모델 죽음
        // 에러 404 : 웹 서버도 죽음.
        console.log('현재 상태', response.status);

        if (response.status) {
          // 서버로부터 응답이 오면 server state를 full-connected로 변경
          dispatch(updateServerState('full-connected'));
        } else {
          // 서버로부터 응답이 오지 않으면 server state를 half-connected로 변경
          dispatch(updateServerState('half-connected'));
        }
      } catch (error) {
        // 에러가 발생하면 server state를 disconneted로 변경
        dispatch(updateServerState('disconnected'));
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
        {/* <FontAwesomeIcon
          icon={faCircle}
          style={{ color: isConnected === "full-connected" ? "green" : "red" }}
        />
        {isConnected ? (
          <span style={{ marginLeft: "5px", color: "green" }}>
            서버에 연결되었습니다
          </span>
        ) : (
          <span style={{ marginLeft: "5px", color: "red" }}>
            서버에 연결되지 않았습니다
          </span>
        )} */}
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
            모델 서버에 연결 중입니다...
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
=======
        {isConnected === 'full-connected' && (
          <>
            <FontAwesomeIcon icon={faCircle} style={{ color: 'green' }} />
            <span style={{ marginLeft: '5px', color: 'green' }}>서버에 연결되었습니다</span>
          </>
        )}

        {isConnected === 'half-connected' && (
          <>
            <FontAwesomeIcon icon={faCircle} style={{ color: 'orange' }} />
            <span style={{ marginLeft: '5px', color: 'orange' }}>모델 서버에 연결되지 않았습니다</span>
          </>
        )}

        {isConnected === 'disconnected' && (
          <>
            <FontAwesomeIcon icon={faCircle} style={{ color: 'red' }} />
            <span style={{ marginLeft: '5px', color: 'red' }}>서버에 연결되지 않았습니다</span>
          </>
        )}
>>>>>>> Stashed changes
      </div>
    </div>
  );
};

export default ServerStatusIndicator;
