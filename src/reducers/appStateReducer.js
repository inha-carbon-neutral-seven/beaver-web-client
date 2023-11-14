// 이 app은 여러개의 상태를 갖는다.

// init : 초기상태
// message_waiting : 메시지 입력 대기
// message_sent : 메시지 전송함
// file_uploading : 파일이 클라이언트에 올라감.
// file_sent : 파일을 전송함
// response_waiting : 전송 후 응답 대기
// response_received : 응답 받음
// anaylizing : 파일 분석 중
// analyzed : 파일 분석 완료

// 시나리오 2. 파일 없이 메시지만 전송
// init -> (사용자가 바로 메시지를 입력) -> message_sent -> response_waiting -> response_received -> message_waiting -> message_sent ... 반복

// 시나리오 3. 파일 업로드 후 메시지 전송
// init -> (사용자가 파일을 업로드함) -> file_uploading -> file_sent -> response_waiting
// -> analyzing -> analyzed -> message_waiting -> message_sent ... 반복

const initialState = {
  currentState: "init",
};

function appStateReducer(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_APP_STATE":
      console.log("디스패치 전 : ", state);
      return {
        ...state,
        currentState: action.payload,
      };
    default:
      return state;
  }
}

export default appStateReducer;
