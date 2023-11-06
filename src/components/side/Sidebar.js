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
    <div>
      <aside className={isExpanded ? styles.side_bar_closed : styles.side_bar}>
        <div className={styles.top_container}>
          <div className={styles.new_chat_button_container}>
            <NewChatButton isShow={isExpanded} />
          </div>

          <div className={styles.expand_button_container}>
            {isExpanded ? (
              <TbLayoutSidebarLeftExpand
                className={styles.expand_button}
                onClick={onClick}
                size={40}
              />
            ) : (
              <TbLayoutSidebarRightExpand
                className={styles.expand_button}
                onClick={onClick}
                size={40}
              />
            )}
          </div>
        </div>

        <div className="chattings"></div>
      </aside>
      {isExpanded ? (
        <TbLayoutSidebarLeftExpand
          className={styles.expand_button2}
          onClick={onClick}
          size={40}
        />
      ) : null}
    </div>
  );
}
export default Sidebar;
