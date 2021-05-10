import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth';


let config = {

    apiKey: "AIzaSyCSAJxoE5ql7_yd7QSd3CZWxDsZC7EYJqw",
    authDomain: "vegan-messenger-559e0.firebaseapp.com",
    projectId: "vegan-messenger-559e0",
    storageBucket: "vegan-messenger-559e0.appspot.com",
    messagingSenderId: "1093433967303",
    appId: "1:1093433967303:web:2f4716c24cb672ac4834e2",
    measurementId: "G-JEHVK1788D"
  
  };

  firebase.initializeApp(config);

  export default firebase;