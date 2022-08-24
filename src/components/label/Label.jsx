import React from "react";
import { X } from "react-feather";
import styles from "./label.module.css";

function Label({ text, close, color, onClose }) {
  return (
    <div className={styles.label} style={{ backgroundColor: color }}>
      {text}
      {close && <X onClick={onClose} />}
    </div>
  );
}

export default Label;
