import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyAcjU6qkszK4N8Z0PGz62bsS_PyDF2oNu0",
    authDomain: "hwitter-d8b08.firebaseapp.com",
    projectId: "hwitter-d8b08",
    storageBucket: "hwitter-d8b08.appspot.com",
    messagingSenderId: "269107194498",
    appId: "1:269107194498:web:4b6988ef541a30da61e29b"
  };

  firebase.initializeApp(firebaseConfig);

  export const firebaseInstance =firebase

  export const authService = firebase.auth();
  export const dbService = firebase.firestore()