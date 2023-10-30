import { useState } from "react";
import styles from "./Sidebar.module.css";

import NewChatButton from "./NewChatButton";
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
    <aside className={isExpanded ? styles.side_bar_expanded : styles.side_bar}>
      <div className={styles.top_container}>
        <div className={styles.new_chat_button_container}>
          <NewChatButton />
        </div>

        <div className={styles.expand_button_container}>
          {isExpanded ? (
            <TbLayoutSidebarRightExpand
              className={styles.expand_button}
              onClick={onClick}
              size={40}
            />
          ) : (
            <TbLayoutSidebarLeftExpand
              className={styles.expand_button}
              onClick={onClick}
              size={40}
            />
          )}
        </div>
      </div>
      <div className="chattings"></div>
    </aside>
  );
}
export default Sidebar;
