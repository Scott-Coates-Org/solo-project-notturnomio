import { useEffect, useState } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import {
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/client";
import { useDispatch } from "react-redux";
import { login, logout } from "../../redux/userSlice.js";

import styles from "./signup.module.css";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signInWithGoogle, user] = useSignInWithGoogle(auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signUpSubmitHandler = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(auth.currentUser, {
          displayName: firstName,
        }).then(() => {
          dispatch(
            login({
              displayName: firstName,
              email: user.email,
              uid: user.uid,
              // accessToken: userCredential.user.accessToken,
            })
            // auth().createCustomToken(uid)
          );
          navigate("/dashboard");
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  // useEffect(() => {
  //   if (user) {
  //     dispatch(
  //       login({
  //         displayName: user.user.displayName,
  //         email: user.user.email,
  //         accessToken: user.user.accessToken,
  //       })
  //     );
  //   }
  // }, [user, dispatch]);

  // const logoutHandler = () => {
  //   signOut(auth);
  //   dispatch(logout());
  // };

  return (
    <div className={styles.signup}>
      <div className={styles.signup__container}>
        <h1>Sign Up</h1>
        <form className={styles.signup__form} onSubmit={signUpSubmitHandler}>
          <label htmlFor={"firstName"}>First Name</label>
          <input
            required
            type="text"
            id="firstName"
            autoFocus
            value={firstName}
            placeholder="Enter your First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label htmlFor={"lastName"}>Last Name</label>
          <input
            required
            type="text"
            id="lastName"
            autoFocus
            value={lastName}
            placeholder="Enter your Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
          <label htmlFor={"email"}>E-mail</label>
          <input
            required
            type="email"
            id="email"
            value={email}
            placeholder="Enter your email address"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor={"password"}>Password</label>
          <input
            required
            type="password"
            id="password"
            value={password}
            placeholder="Enter your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button role="submit">Create account</button>
        </form>
        <div className={styles.signup__divider}>
          <hr />
          <span>OR</span>
          <hr />
        </div>
        <Link to="/login">
          <button type="button" className={styles.signup__login_btn}>
            Sign In
          </button>
        </Link>
        <button
          onClick={() => signInWithGoogle()}
          className={styles.login__button_google}
        >
          <img src="/images/googlelogo.png" alt="Google Logo" />
          Continue with Google
        </button>
      </div>
    </div>
    // <div className={styles.container}>
    // 	<button onClick={() => signInWithGoogle()} className={styles.button}>
    // 		<img src="/images/googlelogo.png" alt="Google Logo" />
    // 		Continue with Google
    // 	</button>
    // 	<button onClick={logoutHandler} className={styles.button}>
    // 		Sign Out
    // 	</button>
    // </div>
  );
};

export default Signup;
