import { useState } from "react";
import styles from "./Sidebar.module.css";
import {
  TbLayoutSidebarLeftExpand,
  TbLayoutSidebarRightExpand,
} from "react-icons/tb";

function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const onClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={isExpanded ? styles.side_bar_expanded : styles.side_bar}>
      menu1
      {isExpanded ? (
        <TbLayoutSidebarRightExpand
          className={styles.expand_button}
          onClick={onClick}
          size={30}
        />
      ) : (
        <TbLayoutSidebarLeftExpand
          className={styles.expand_button}
          onClick={onClick}
          size={30}
        />
      )}
    </div>
  );
}
export default Sidebar;
