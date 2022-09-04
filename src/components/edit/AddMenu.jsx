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
  description,
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [minValueLength, setMinValueLength] = useState(false);

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

  const onInputChangeHandler = (e) => {
    e.target.value.length < 4 || e.target.value
      ? setMinValueLength(true)
      : setMinValueLength(false);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    onSubmit(e);
    setShowMenu(false);
    setMinValueLength(false);
  };

  const onCloseHandler = () => {
    setShowMenu(false);
    setMinValueLength(false);
  };

  return (
    <div className={styles["add-menu"]}>
      {showMenu ? (
        <form
          className={`${styles["add-menu-form"]} ${menuFormClass || ""}`}
          onSubmit={onSubmitHandler}
        >
          {description ? (
            <textarea
              required
              autoFocus
              rows="3"
              maxLength="180"
              placeholder={placeholder}
              defaultValue={placeholder}
              name={id}
            ></textarea>
          ) : (
            <input
              required
              autoFocus
              type="text"
              minLength="3"
              placeholder={placeholder || "Enter item title"}
              defaultValue={placeholder}
              name={id}
              onChange={onInputChangeHandler}
            />
          )}
          <div className={styles["add-menu-form-footer"]}>
            <button type="submit">{submitText || "Add"}</button>
            <X onClick={onCloseHandler} />
          </div>
        </form>
      ) : (
        <button
          disabled={minValueLength}
          className={`${styles["add-menu-form-call"]} ${
            menuFormTextClass || ""
          }`}
          onClick={() => setShowMenu(true)}
        >
          {buttonText || "Add Item"}
        </button>
      )}
    </div>
  );
}

export default AddMenu;
