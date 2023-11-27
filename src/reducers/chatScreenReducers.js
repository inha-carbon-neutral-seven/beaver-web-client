// 저장할 변수가 필요해서 만듬
// 주로 chatscreen.js에서 사용됨
// 다른데서 사용할수도 있고

// actionType 정의
const SET_LOADING = "SET_LOADING";
const SET_MESSAGE = "SET_MESSAGE";
const SET_SENT_MESSAGE = "SET_SENT_MESSAGE";
const SET_AIANSWER = "SET_AIANSWER";
const ADD_TO_CHATLOG = "ADD_TO_CHATLOG";
const SET_SELECTEDFILE = "SET_SELECTEDFILE";
const ADD_ANALYZED_FILE_DATA = "ADD_ANALYZED_FILE_DATA";

// action creator 정의
export function setLoading(loading) {
  return {
    type: SET_LOADING,
    payload: loading,
  };
}

export function setMessage(message) {
  return {
    type: SET_MESSAGE,
    payload: message,
  };
}

export function setSentMessage(sentMessage) {
  return {
    type: SET_SENT_MESSAGE,
    payload: sentMessage,
  };
}

export function setAIAnswer(aiAnswer) {
  return {
    type: SET_AIANSWER,
    payload: aiAnswer,
  };
}

export function addToChatLog(user, message) {
  return {
    type: ADD_TO_CHATLOG,
    payload: { user, message },
  };
}

export function setSelectedFile(selectedFile) {
  return {
    type: SET_SELECTEDFILE,
    payload: selectedFile,
  };
}

export function addAnalyzedFileData(analyzedFileData) {
  return {
    type: ADD_ANALYZED_FILE_DATA,
    payload: { analyzedFileData },
  };
}

// 초기 state 정의
const initialState = {
  loading: false,
  message: "",
  sentMessage: "",
  aiAnswer: "",
  chatlog: [],
  selectedFile: null,
  analyzedFileDataList: [],
};

// reducer
function chatScreenReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };
    case SET_SENT_MESSAGE:
      return {
        ...state,
        sentMessage: action.payload,
      };
    case SET_AIANSWER:
      return {
        ...state,
        aiAnswer: action.payload,
      };
    case ADD_TO_CHATLOG:
      return {
        ...state,
        chatlog: [
          ...state.chatlog,
          { user: action.payload.user, message: action.payload.message },
        ],
      };
    case SET_SELECTEDFILE:
      return {
        ...state,
        selectedFile: action.payload,
      };
    case ADD_ANALYZED_FILE_DATA:
      return {
        ...state,
        analyzedFileDataList: [
          ...state.analyzedFileDataList,
          action.payload.analyzedFileData,
        ],
      };
    default:
      return state;
  }
}
export default chatScreenReducer;
