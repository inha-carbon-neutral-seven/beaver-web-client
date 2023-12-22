import ServerStatusIndicator from './ServerStateIndicator';
import Button from '@mui/material/Button';
import beaver from '../../image/logo.jpg';

function Header({ param }) {
  const handleButtonClick = (p) => {
    param(p);
  };
  return (
    <div className="h-16 bg-indigo-500 flex justify-between items-center px-4 fixed w-full">
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <img src={beaver} className="h-12 mr-3 rounded-full" />
            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
              비버.ai
            </span>
          </a>
        </div>

        <Button className="text-white btn" variant="ghost" onClick={() => handleButtonClick(0)}>
          대화하기
        </Button>
        <Button className="text-white btn" variant="ghost" onClick={() => handleButtonClick(1)}>
          대시보드
        </Button>
        <Button className="text-white btn" variant="ghost" onClick={() => handleButtonClick(2)}>
          데이터
        </Button>
      </div>
      <ServerStatusIndicator />
    </div>
  );
}
export default Header;
