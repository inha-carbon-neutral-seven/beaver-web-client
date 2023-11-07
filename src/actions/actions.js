import * as actionTypes from "./actionTypes";

export function setLoading(loading) {
  return {
    type: actionTypes.SET_LOADING,
    payload: loading,
  };
}

export function setMessage(message) {
  return {
    type: actionTypes.SET_MESSAGE,
    payload: message,
  };
}

export function setSentMessage(sentMessage) {
  return {
    type: actionTypes.SET_SENTMESSAGE,
    payload: sentMessage,
  };
}

export function setAIAnswer(aiAnswer) {
  return {
    type: actionTypes.SET_AIANSWER,
    payload: aiAnswer,
  };
}

export function addToChatLog(chatLog) {
  return {
    type: actionTypes.ADD_TO_CHATLOG,
    payload: chatLog,
  };
}

export function setIsExpanded(isExpanded) {
  return {
    type: actionTypes.SET_ISEXPANDED,
    payload: isExpanded,
  };
}
