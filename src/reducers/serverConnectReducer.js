// 서버와 연결 여부를 확인하는 상태변수
// 서버와 연결이 되면 full-connected
// 웹 서버와 연결 그러나 모델 서버가 죽은 경우 : half-connected
// 웹 서버도 죽은 경우 : disconnected

// response.status === true : 웹, 모델 살아있음
// response.status === false : 웹은 살고, 모델 죽음
// 에러 뭐 404 뭐 그런거 : 웹도 죽음.

// action type
const UPDATE_SERVER_STATE = "UPDATE_SERVER_STATE";

// action creator
export function updateServerState(serverState) {
  return {
    type: UPDATE_SERVER_STATE,
    payload: serverState,
  };
}

// 초기 state 정의
const initialState = {
  isConnected: "disconnected",
};

// reducer
function serverConnectReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SERVER_STATE:
      return {
        ...state,
        isConnected: action.payload,
      };
    default:
      return state;
  }
}
export default serverConnectReducer;
