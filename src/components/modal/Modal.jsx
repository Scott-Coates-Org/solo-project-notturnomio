import React from "react";

import styles from "./modal.module.css";

function Modal(props) {
  return (
    <div
      className={styles.modal}
      onClick={() => (props.onClose ? props.onClose() : "")}
    >
      <div
        className={`${styles["modal-content"]} ${styles["custom-scroll"]}`}
        onClick={(e) => e.stopPropagation()}
      >
        {props.children}
      </div>
    </div>
  );
}

export default Modal;
