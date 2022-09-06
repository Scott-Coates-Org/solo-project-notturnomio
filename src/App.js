import React, { useState } from "react";
import styles from "./app.module.css";
import Login from "./components/login/Login";
// import { app, db, auth, database } from "./firebase/client";
import { Link, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Header from "./components/header/Header";
import ListsContainer from "./components/listsContainer/ListsContainer";
import Signup from "./components/login/Signup";
import { login, logout, selectUser } from "./redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { auth } from "./firebase/client";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const user = useSelector(selectUser);
  const [headerMenuState, setHeaderMenuState] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          login({
            displayName: user.displayName,
            email: user.email,
            uid: user.uid,
          })
        );
        navigate("/dashboard");
      } else {
        dispatch(logout());
        navigate("/login");
      }
    });
  }, []);

  return (
    <div className={styles.App}>
      <Routes>
        <Route
          path="/dashboard"
          element={
            !user ? (
              <Navigate to="/login" replace />
            ) : (
              <>
                <Header
                  menuState={headerMenuState}
                  setMenuState={setHeaderMenuState}
                />
                <ListsContainer />
              </>
            )
          }
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" replace /> : <Login />}
        />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="*" element={<NotFound/>}/> */}
      </Routes>
    </div>
  );
}

export default App;
