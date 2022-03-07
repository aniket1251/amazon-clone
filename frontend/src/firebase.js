// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/compat/app';
import { getAuth} from "firebase/auth";
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDkw6oBSNurWtQZq8hiuA1RCTVTrzcoMiI",
    authDomain: "clone-24818.firebaseapp.com",
    projectId: "clone-24818",
    storageBucket: "clone-24818.appspot.com",
    messagingSenderId: "216768108608",
    appId: "1:216768108608:web:3a5e637834ef7f1d21e7a5",
    measurementId: "G-5R10VE7P7N"
  };


  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const auth = getAuth();
  const db = firebaseApp.firestore();




  export {db, auth};