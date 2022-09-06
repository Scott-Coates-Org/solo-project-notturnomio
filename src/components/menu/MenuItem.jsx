import React from "react";
import styles from "./menuItem.module.css";

function MenuItem({ title }) {
  return (
    <div className={styles["menu_item"]}>
      <h3>{title}</h3>
    </div>
  );
}

export default MenuItem;
