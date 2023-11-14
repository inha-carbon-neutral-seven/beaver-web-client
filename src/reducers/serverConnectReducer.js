// 서버와 연결 여부를 확인하는 상태변수
// 서버와 연결이 되면 true, 연결이 끊기면 false
const initialState = {
  isConnected: false,
};

function serverConnectReducer(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_SERVER_STATE":
      return {
        ...state,
        isConnected: action.payload,
      };
    default:
      return state;
  }
}
export default serverConnectReducer;
