import React, { useEffect, useRef, useState } from "react";
import { MoreHorizontal } from "react-feather";
import styles from "./dropdown.module.css";

function Dropdown({ list, onSelect, componentId, listId }) {
  const [toggleDD, setToggleDD] = useState(false);

  const dropdownRef = useRef();

  const handleToggleDD = (e) => {
    e.stopPropagation();
    if (dropdownRef && !dropdownRef.current.contains(e.target)) {
      setToggleDD(false);
    } else {
      setToggleDD(true);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleToggleDD);

    return () => {
      document.removeEventListener("click", handleToggleDD);
    };
  }, []);

  const handleSelect = (e) => {
    e.stopPropagation();
    const item = e.target;
    onSelect({ item, componentId, listId });
  };

  return (
    <div ref={dropdownRef} className={styles["dd-wrapper"]}>
      <div className="dd-header">
        <div className={styles["dd-header-title"]}>
          <MoreHorizontal onClick={handleToggleDD} />
        </div>
      </div>
      {toggleDD && (
        <ul className={styles["dd-list"]}>
          {list &&
            list.map((li) => (
              <li
                key={list.indexOf(li)}
                className={styles["dd-list-item"]}
                value={li.value}
                onClick={handleSelect}
              >
                {li.label}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
