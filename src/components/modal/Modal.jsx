import React from "react";

import styles from "./modal.module.css";

function Modal(props) {
  return (
    <div className={styles.modal}>
      <div
        className={styles["modal-content"]}
        onClick={(e) => e.stopPropagation()}
      >
        {props.children}
      </div>
    </div>
  );
}

export default Modal;
