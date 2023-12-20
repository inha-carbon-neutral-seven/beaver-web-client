import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from './Loader';
import ChatLogs from './ChatLogs';
import UserInput from './Input/UserInput';
import FileUploadToServer from './Input/FileUploadToServer';
import { addToChatLog } from '../../reducers/chatScreenReducers';

function ChatScreen({ fileData, onFileChange }) {
  const dispatch = useDispatch(); // useDispatch is now at the top

  // useSelector hooks
  const currentState = useSelector((state) => state.appState.currentState);
  const isConnected = useSelector((state) => state.connected.isConnected);
  const loading = useSelector((state) => state.chatScreen.loading);
  const message = useSelector((state) => state.chatScreen.message);
  const sentMessage = useSelector((state) => state.chatScreen.sentMessage);
  const aiAnswer = useSelector((state) => state.chatScreen.aiAnswer);
  const chatlog = useSelector((state) => state.chatScreen.chatlog);
  const selectedFile = useSelector((state) => state.chatScreen.selectedFile);

  // useState hook for local state
  const [dataName, setDataName] = useState('');
  const fileInput = React.createRef();

  // Handler functions and useEffects
  // ... include all your event handlers and useEffects here

  return (
    <div className="flex-grow flex flex-col bg-white dark:bg-gray-800 p-4 h-full">
      {/* File Upload related component */}
      {isConnected && <FileUploadToServer fileData={fileData} onFileChange={onFileChange} />}

      <Loader currentState={currentState} />
      {currentState === 'analyzed' && <div>파일 분석 완료!</div>}

      <div className="flex-grow flex flex-col justify-between">
        {/* Chat message display */}
        <ChatLogs />
        {/* User message input */}
        <UserInput fileData={fileData} onFileChange={onFileChange} />
      </div>
    </div>
  );
}

export default ChatScreen;
