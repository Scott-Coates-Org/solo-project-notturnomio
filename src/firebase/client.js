import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import "@firebase/auth";
import "@firebase/storage";

// const firebaseKey = process.env.REACT_APP_FIREBASE_API_KEY;
// const firebaseProjectId = process.env.REACT_APP_FIREBASE_PROJECT_ID;
// const firebaseAuthDomain = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN;
// const firebaseStorageBucket = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET;

// const firebaseKey = "AIzaSyDB18Ug68kjMrmXqEvHE9aqPMH5dd71ZqY";
// const firebaseProjectId = "dm-dashboard-95f16";
// const firebaseAuthDomain = "dm-dashboard-95f16.firebaseapp.com";
// const firebaseStorageBucket = "dm-dashboard-95f16.appspot.com";

const firebaseConfig = {
  apiKey: "AIzaSyDB18Ug68kjMrmXqEvHE9aqPMH5dd71ZqY",
  authDomain: "dm-dashboard-95f16.firebaseapp.com",
  databaseURL:
    "https://dm-dashboard-95f16-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "dm-dashboard-95f16",
  storageBucket: "dm-dashboard-95f16.appspot.com",
  messagingSenderId: "261918955080",
  appId: "1:261918955080:web:2cb4d6db99f2fc9b60aa7d",
  measurementId: "G-9GZFXLLGTW",
};

// const firebaseConfig = {
//   apiKey: firebaseKey,
//   authDomain: firebaseAuthDomain,
//   projectId: firebaseProjectId,
//   storageBucket: firebaseStorageBucket,
// };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const database = getDatabase(app);

export { app, db, auth, database };
