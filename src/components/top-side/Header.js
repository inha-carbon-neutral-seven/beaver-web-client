import ServerStatusIndicator from "./ServerStateIndicator";
import Button from "@mui/material/Button";
import beaver from "../../image/logo.jpg";

function Header() {
  return (
    //<div className={styles.header}>
    <div className="h-16 bg-indigo-500 flex justify-between items-center px-4 fixed w-full">
      <div className="flex items-center space-x-4">
        <div className="flex items-center justify-start">
          <img src={beaver} className="h-12 mr-3 rounded-full" />
          <a href="/">
            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
              비버.ai
            </span>
          </a>
        </div>

        <Button className="text-white" variant="ghost">
          대화
        </Button>
        <Button className="text-white" variant="ghost">
          대시보드
        </Button>
      </div>
      <ServerStatusIndicator />
    </div>
  );
}
export default Header;
