import React from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedFile } from '../../../reducers/chatScreenReducers';
import { updateAppState } from '../../../reducers/appStateReducer';

// file upload 버튼 컴포넌트 return.
// 파일 업로드 버튼 클릭 시, file input 창을 띄운다.
function FileInput() {
  const fileInput = React.createRef();

  // dispatch func
  const dispatch = useDispatch();

  // 파일 업로드 버튼 클릭 시
  const openFileInput = () => {
    fileInput.current.click();
  };

  // 파일 업로드 시
  const handleFileChange = (e) => {
    dispatch(setSelectedFile(e.target.files[0]));
    dispatch(updateAppState('file_uploading'));
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
        ref={fileInput}
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

export default FileInput;
