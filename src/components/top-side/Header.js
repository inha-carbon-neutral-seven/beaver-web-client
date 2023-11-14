import styles from "./Header.module.css";
import ServerStatusIndicator from "./ServerStateIndicator";
import Button from "@mui/material/Button";

function Header() {
  return (
    //<div className={styles.header}>
    <div className="h-16 bg-indigo-500 flex justify-between items-center px-4 fixed w-full">
      <div className="flex items-center space-x-4">
        <h1>비버.ai</h1>

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
