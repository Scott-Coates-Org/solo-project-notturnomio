import React from "react";
import { LogOut, Menu, X } from "react-feather";
import { Link } from "react-router-dom";
import MainMenu from "../menu/Menu";
import styles from "./header.module.css";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/client";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/userSlice";
import { logoutGoogle } from "../../redux/authSlice";

function Header({ menuState, setMenuState }) {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    signOut(auth);
    dispatch(logout());
    dispatch(logoutGoogle());
  };

  return (
    <header className={styles["header"]}>
      <div className={styles["header__logo"]}>
        <Link to="/">
          <h2>Dunder Mifflin Task Board</h2>
        </Link>
      </div>
      <div className={styles["header__right"]}>
        {!menuState && (
          <div className={styles["header__right__profile"]}>
            {/* <Link to="/login">Logout</Link> */}
            <div className={styles["header__right__profile_name"]}>{user}</div>
            <div className={styles["header__right__profile_logout"]}>
              <LogOut onClick={logoutHandler} />
            </div>
          </div>
        )}
        <div
          className={styles["header__right__menu"]}
          onClick={() => setMenuState(!menuState)}
        >
          {menuState ? <X /> : <Menu />}
          {menuState && <MainMenu />}
        </div>
      </div>
    </header>
  );
}

export default Header;
