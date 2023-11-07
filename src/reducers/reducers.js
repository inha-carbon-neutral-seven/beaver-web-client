//import { combineReducers } from "redux";

const initialState = {
  loading: false,
  message: "",
  sentMessage: "",
  aianswer: "",
  chatlog: [],
  isExpanded: false,
};

function rootReducer(state = initialState, action) {
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
    case "SET_ISEXPANDED":
      return {
        ...state,
        isExpanded: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
