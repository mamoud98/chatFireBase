// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDUsMAWcdWKNGMWP7GZczQOn4IWEFg71O8",
  authDomain: "chate-55aa4.firebaseapp.com",
  projectId: "chate-55aa4",
  storageBucket: "chate-55aa4.appspot.com",
  messagingSenderId: "932857886117",
  appId: "1:932857886117:web:ae271781c37cc7d4d4244c",
  measurementId: "G-R743GXWKT8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

const db = getDatabase();

// const addUser = (userID, name) => {
//   const reference = ref(db, "/UserChannels" + userID);
//   set(reference, {
//     name,
//   });
// };
// addUser("Test1", "test1");
