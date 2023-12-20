import { Button } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FileInputButton from './FileInputButton';
import { updateAppState } from '../../../reducers/appStateReducer';
import { setAIAnswer, setLoading, setMessage, setSentMessage } from '../../../reducers/chatScreenReducers';

function UserInput({ fileData, onFileChange }) {
  const currentState = useSelector((state) => state.appState.currentState);
  const isConnected = useSelector((state) => state.connected.isConnected);
  const loading = useSelector((state) => state.chatScreen.loading);
  const message = useSelector((state) => state.chatScreen.message);
  const dispatch = useDispatch();

  const messageHandler = async (e) => {
    e.preventDefault();
    if (!loading && message) {
      dispatch(setLoading(true));
      dispatch(setSentMessage(message));

      try {
        const response = await fetch('http://beaver7s.duckdns.org/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message }),
        });

        const data = await response.json();
        dispatch(setAIAnswer(data.message));
        dispatch(updateAppState('response_received'));
      } catch (error) {
        console.error('Error:', error);
        // 여기에 사용자에게 오류를 표시하는 로직을 추가할 수 있습니다.
      } finally {
        dispatch(setLoading(false));
        dispatch(setMessage(''));
      }
    }
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
      <div className="flex items-center space-x-2 px-4">
        <FileInputButton onFileChange={onFileChange} />
        <form className="flex flex-grow" onSubmit={messageHandler}>
          <input
            className="flex-grow rounded-lg w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            placeholder="Type your message"
            type="text"
            value={message}
            disabled={!isConnected || currentState === 'analyzing' || currentState === 'response_waiting'}
            onChange={(e) => dispatch(setMessage(e.target.value))}
          />
          <Button type="submit" variant="outlined" className="ml-2" disabled={loading}>
            전송
          </Button>
        </form>
      </div>
    </div>
  );
}

export default UserInput;
