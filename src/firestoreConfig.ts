// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlK6xe0vce3EkW_jM95D_8-eQpavvu7vg",
  authDomain: "fir-crud-react-3b0e3.firebaseapp.com",
  projectId: "fir-crud-react-3b0e3",
  storageBucket: "fir-crud-react-3b0e3.appspot.com",
  messagingSenderId: "881823242821",
  appId: "1:881823242821:web:8b598463547e69aedf612c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//Initialize the db for the app
const db = getFirestore(app);
export { db };
