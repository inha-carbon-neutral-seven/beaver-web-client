import styles from "./Header.module.css";
import { useSelector, useDispatch } from "react-redux";
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";

function Header() {
  const isExpanded = useSelector((state) => state.isExpanded);
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch({ type: "SET_ISEXPANDED", payload: !isExpanded });
  };

  return (
    <div className={!isExpanded ? styles.header : styles.header_full}>
      {isExpanded ? (
        <TbLayoutSidebarLeftExpand
          className={styles.expand_button2}
          onClick={onClick}
          size={40}
        />
      ) : null}
      <h1 className={styles.tmp}>Chatbot</h1>
    </div>
  );
}
export default Header;
