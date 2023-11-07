import { useSelector, useDispatch } from "react-redux";

import styles from "./Sidebar.module.css";

import NewChatButton from "./NewChatButton";
import { TbLayoutSidebarRightExpand } from "react-icons/tb";

function Sidebar() {
  const isExpanded = useSelector((state) => state.isExpanded);
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch({ type: "SET_ISEXPANDED", payload: !isExpanded });
  };
  // const [isExpanded, setIsExpanded] = useState(false);
  // const onClick = () => {
  //   setIsExpanded(!isExpanded);
  // };

  return (
    <aside className={isExpanded ? styles.side_bar_closed : styles.side_bar}>
      <div className={styles.top_container}>
        <div className={styles.new_chat_button_container}>
          <NewChatButton isShow={isExpanded} />
        </div>

        <div className={styles.expand_button_container}>
          {isExpanded ? null : (
            <TbLayoutSidebarRightExpand
              className={styles.expand_button}
              onClick={onClick}
              size={40}
            />
          )}
        </div>
      </div>
    </aside>
  );
}
export default Sidebar;
