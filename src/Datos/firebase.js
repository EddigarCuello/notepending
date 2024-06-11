import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBgXKBmclgm3zqNPHxPI91jjy7MZmiBmyM",
  authDomain: "notes-pending.firebaseapp.com",
  projectId: "notes-pending",
  storageBucket: "notes-pending.appspot.com",
  messagingSenderId: "799722007341",
  appId: "1:799722007341:web:b0094285f25378eeac01a4",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

//const db = getFirestore(app);

export { auth, db,storage };
