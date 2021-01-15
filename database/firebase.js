import firebase from 'firebase'

import 'firebase/firestore'
var firebaseConfig = {
    apiKey: "AIzaSyBZIkVcH9jia5dq7us1bHpCVpEtlf2EfKg",
    authDomain: "react-native-firebase-5f600.firebaseapp.com",
    databaseURL: "https://react-native-firebase-5f600.firebaseio.com",
    projectId: "react-native-firebase-5f600",
    storageBucket: "react-native-firebase-5f600.appspot.com",
    messagingSenderId: "78789005453",
    appId: "1:78789005453:web:0d278813455bd1528152c4",
    measurementId: "G-1YKXH07VE3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  const db= firebase.firestore()
  export default {
      firebase,
      db

  }