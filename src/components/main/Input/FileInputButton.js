import React, { useRef } from 'react'; // useRef 훅 임포트
import { useDispatch } from 'react-redux';
import { setSelectedFile } from '../../../reducers/chatScreenReducers';
import { updateAppState } from '../../../reducers/appStateReducer';

function FileInputButton({ onFileChange }) {
  const dispatch = useDispatch();
  const fileInput = useRef(null); // useRef 훅을 사용하여 ref 생성

  // 파일 업로드 버튼 클릭 시 input 창을 띄우기
  const openFileInput = () => {
    fileInput.current.click();
  };

  // 파일 업로드 시 처리
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(setSelectedFile(file));
      dispatch(updateAppState('file_uploading'));
      onFileChange(file); // 부모 컴포넌트에 파일 데이터 전달
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
        ref={fileInput} // ref 연결
        style={{ display: 'none' }}
      />
      <button
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        onClick={openFileInput}
      >
        업로드
      </button>
    </div>
  );
}

export default FileInputButton;
