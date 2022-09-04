import React from "react";
import { Trash2 } from "react-feather";
import styles from "./task.module.css";

function Task({ id, name, checked, onRemove, onChecked }) {
  return (
    <div className={styles.tasks}>
      <div className={styles["tasks-checkbox"]}>
        <input
          type="checkbox"
          id={name}
          name="tasks"
          value={name}
          checked={checked ? checked : ""}
          onChange={(e) => onChecked({ e, id })}
        />
        <label htmlFor={name}>{name}</label>
      </div>
      <Trash2 className={styles["tasks-remove"]} onClick={() => onRemove(id)} />
    </div>
  );
}

export default Task;
