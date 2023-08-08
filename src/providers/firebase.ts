// import firebaseApp from "firebase/app";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMggACdye2aPnxEztEikEfY_qSfSW7yPc",
  authDomain: "manager-79b09.firebaseapp.com",
  projectId: "manager-79b09",
  storageBucket: "manager-79b09.appspot.com",
  messagingSenderId: "739832759466",
  appId: "1:739832759466:web:fc4dacf86df277636ebcd3",
  measurementId: "G-NPYRYTW0D0",
  // databaseURL: "https://manager-79b09-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
// const app = firebaseApp.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getFirestore(app);

export default {
  app,
  analytics,
  auth,
  database
};
