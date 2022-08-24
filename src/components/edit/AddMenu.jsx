import React from "react";
import { useState } from "react";
import { X } from "react-feather";
import styles from "./addMenu.module.css";

function AddMenu({
  buttonText,
  submitText,
  onSubmit,
  placeholder,
  menuFormClass,
  menuFormTextClass,
  id,
}) {
  const [showMenu, setShowMenu] = useState(false);

  // const scrollRef = useRef();
  // const elementToScroll = scrollRef.current;

  // useEffect(() => {
  //   if (elementToScroll) {
  //     elementToScroll.scrollTop = 100;
  //     console.log(elementToScroll);
  //   }
  // }, [elementToScroll]);

  // const scrollBottom = (element) => {
  //   setShowMenu(true);
  //   element.scrollIntoView({ smoothScroll: true });
  // };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    onSubmit(e);
    setShowMenu(false);
  };
  return (
    <div className={styles["add-menu"]}>
      {showMenu ? (
        <form
          className={`${styles["add-menu-form"]} ${menuFormClass || ""}`}
          onSubmit={onSubmitHandler}
        >
          <input
            autoFocus
            type="text"
            placeholder={placeholder || "Enter item title"}
            defaultValue={placeholder}
            name={id}
          />
          <div className={styles["add-menu-form-footer"]}>
            <button type="submit">{submitText || "Add"}</button>
            <X onClick={() => setShowMenu(false)} />
          </div>
        </form>
      ) : (
        <p
          className={`${styles["add-menu-form-call"]} ${
            menuFormTextClass || ""
          }`}
          onClick={() => setShowMenu(true)}
        >
          {buttonText || "Add Item"}
        </p>
      )}
    </div>
  );
}

export default AddMenu;
