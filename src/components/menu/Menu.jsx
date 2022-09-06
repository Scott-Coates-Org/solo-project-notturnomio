import React from "react";
import styles from "./menu.module.css";
import MenuItem from "./MenuItem";

function Menu() {
  return (
    <div className={styles.menu}>
      <MenuItem title="example 1" />
      <MenuItem title="example 2" />
      <MenuItem title="example 3" />
      <MenuItem title="example 4" />
    </div>
  );
}

export default Menu;
