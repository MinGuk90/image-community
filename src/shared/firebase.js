import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "image-community-97660.firebaseapp.com",
  projectId: "image-community-97660",
  storageBucket: "image-community-97660.appspot.com",
  messagingSenderId: "157954951536",
  appId: "1:157954951536:web:4801ddc0d3eb905e3627b5",
  measurementId: "G-GXVEENQTPT",
};
firebase.initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export { auth, apiKey, firestore, storage };
