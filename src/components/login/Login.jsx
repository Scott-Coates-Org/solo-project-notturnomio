import { useEffect, useState } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import {
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase/client";
import { useDispatch } from "react-redux";
import { login, logout } from "../../redux/userSlice";

import styles from "./login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { loginGoogle, logoutGoogle } from "../../redux/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithGoogle, user] = useSignInWithGoogle(auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const signInSubmitHandler = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(
          login({
            displayName: user.displayName,
            email: user.email,
            uid: user.uid,
            // accessToken: userCredential.user.accessToken,
          })
          // auth().createCustomToken(uid)
        );
        navigate("/dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const signInWithGoogleToken = (params) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        signInWithGoogle(user);
        dispatch(
          login({
            displayName: user.displayName,
            email: user.email,
            accessToken: user.accessToken,
          })
        );
        navigate("/dashboard");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  useEffect(() => {
    if (user) {
      dispatch(
        loginGoogle({
          displayName: user.displayName,
          email: user.email,
          accessToken: user.accessToken,
        })
      );
      navigate("/dashboard");
    } else {
      dispatch(logoutGoogle());
      navigate("/login");
    }
  }, [user, dispatch]);

  // const logoutHandler = () => {
  //   signOut(auth);
  //   dispatch(logoutGoogle());
  // };

  return (
    <div className={styles.login}>
      <div className={styles.login__container}>
        <h1>Sign In</h1>
        <form className={styles.login__form} onSubmit={signInSubmitHandler}>
          <label htmlFor={"email"}>E-mail</label>
          <input
            required
            type="email"
            id="email"
            autoFocus
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
          <button role="submit">Sign In</button>
        </form>
        <div className={styles.login__divider}>
          <hr />
          <span>OR</span>
          <hr />
        </div>
        <Link to="/signup">
          <button type="button" className={styles.login__signup_btn}>
            Create account
          </button>
        </Link>
        <button
          onClick={() => signInWithGoogleToken()}
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

export default Login;
