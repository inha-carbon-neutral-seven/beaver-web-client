import { useState } from "react";
import styles from "./Sidebar.module.css";
import {
  TbLayoutSidebarLeftExpand,
  TbLayoutSidebarRightExpand,
} from "react-icons/tb";
import Button from "@mui/material/Button";
import Add from "@mui/icons-material/Add";

function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const onClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <aside className={isExpanded ? styles.side_bar_expanded : styles.side_bar}>
      <Button
        variant="outlined"
        startIcon={<Add />}
        sx={{ m: 1, color: "white", borderColor: "gray" }}
      >
        New Chat
      </Button>
      {isExpanded ? (
        <TbLayoutSidebarRightExpand
          className={styles.expand_button}
          onClick={onClick}
          size={50}
        />
      ) : (
        <TbLayoutSidebarLeftExpand
          className={styles.expand_button}
          onClick={onClick}
          size={50}
        />
      )}
    </aside>
  );
}
export default Sidebar;
