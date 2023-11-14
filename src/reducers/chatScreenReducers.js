// 저장할 변수가 필요해서 만듬
// 주로 chatscreen.js에서 사용됨
// 다른데서 사용할수도 있고

const initialState = {
  loading: false,
  message: "",
  sentMessage: "",
  aiAnswer: "",
  chatlog: [],
  selectedFile: null,
  selectedFileName: "",
  anaylizedFileDataList: [],
};

function chatScreenReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_MESSAGE":
      return {
        ...state,
        message: action.payload,
      };
    case "SET_SENT_MESSAGE":
      return {
        ...state,
        sentMessage: action.payload,
      };
    case "SET_AIANSWER":
      return {
        ...state,
        aiAnswer: action.payload,
      };
    case "ADD_TO_CHATLOG":
      return {
        ...state,
        chatlog: [
          ...state.chatlog,
          { user: action.payload.user, message: action.payload.message },
        ],
      };
    case "SET_SELECTEDFILE":
      return {
        ...state,
        selectedFile: action.payload,
      };
    case "SET_SELECTEDFILENAME":
      return {
        ...state,
        selectedFileName: action.payload,
      };
    case "ADD_ANALYZED_FILE_DATA":
      return {
        ...state,
        anaylizedFileDataList: [
          ...state.anaylizedFileDataList,
          action.payload.anaylizedFileData,
        ],
      };
    default:
      return state;
  }
}
export default chatScreenReducer;
