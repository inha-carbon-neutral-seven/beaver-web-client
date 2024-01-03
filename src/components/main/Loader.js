import { Spinnericon } from '../../icons';
function Loader({ currentState }) {
  const messages = [
    '파일을 전송 중입니다...',
    '파일 전송 성공!',
    '파일을 분석중입니다...',
    '파일 분석 완료!',
  ];
  return (
    <div className="flex items-center justify-center pt-5">
      <div className="text-sm text-center">
        {currentState === 'response_waiting' && (
          <div className="flex items-center space-x-2">
            <p className="text-sm text-center">{messages[0]}</p>
            <Spinnericon />
          </div>
        )}
        {currentState === 'analyzing' && (
          <div className="items-center space-y-10">
            <p className="text-sm text-center">{messages[1]}</p>
            <div className="flex space-x-2">
              <p className="text-sm text-center">{messages[2]}</p>
              <Spinnericon />
            </div>
          </div>
        )}
        {currentState === 'analyzed' && (
          <p className="text-sm text-center">{messages[3]}</p>
        )}
      </div>
    </div>
  );
}

export default Loader;
