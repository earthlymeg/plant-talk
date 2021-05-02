import React, { useState, useEffect } from "react";
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'

import { useAuthState } from 'react-firebase-hooks/auth';
import reactDom from "react-dom";

import { IoSend } from 'react-icons/io5';
import { FcMenu } from "react-icons/fc";
import Logo from './assets/plant-talk-logo.png'

firebase.initializeApp({

  apiKey: "AIzaSyCSAJxoE5ql7_yd7QSd3CZWxDsZC7EYJqw",
  authDomain: "vegan-messenger-559e0.firebaseapp.com",
  projectId: "vegan-messenger-559e0",
  storageBucket: "vegan-messenger-559e0.appspot.com",
  messagingSenderId: "1093433967303",
  appId: "1:1093433967303:web:2f4716c24cb672ac4834e2",
  measurementId: "G-JEHVK1788D"

})

const auth = firebase.auth();
const firestore = firebase.firestore();


function App() {
  //use auth state react/firebase hooks
  const [user] = useAuthState(auth);


  return (
    <div className="App">
      <header>
       
      </header>
      
      <section>
        {/* if user is signed in display chat room else display sign in */}
        <NavBar/>
        {user ? <ChatRoom /> : <SignIn />}
        <SignOut />
      </section>
    </div>
  );
}


function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <button onClick={signInWithGoogle}>Sign In With Google</button>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom() {

  const ref = firebase.firestore().collection("messages").orderBy('date', 'desc');
  const [messages, setMessages] = useState([]);
  const [formVal, setFormVal] = useState('');

  useEffect(() => {
    ref.onSnapshot((snap) => {
      setMessages(snap.docs.map(doc => doc.data()));
    }
    );

  }, []);

  const sendMessage = (e) => {
    e.preventDefault();

    //later add photo id
    const { uid } = auth.currentUser;
    firebase.firestore().collection("messages").add({
      text: formVal,
      date: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      username: auth.currentUser.displayName

    }).then(() => console.log('successful post by', auth.currentUser.displayName))
      .catch(err => console.log(err))

    setFormVal('');
  }


  return (
    <>
      <div className="all-messages">
        {messages && messages.map(msg =>
          <ChatMessage key={msg.id} message={msg} date={msg.date} username={msg.username} />
        )}
      </div>

      <form>
        <input placeholder="Your message..." value={formVal} onChange={(e) => setFormVal(e.target.value)} />
        <button className="submit-button" type="submit" onClick={sendMessage}><IoSend /></button>
      </form>
    </>
  )
}

function ChatMessage(props) {
  const { text, uid, date, username } = props.message;
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  return (
    <div className={`message ${messageClass}`}>
      {/* add image here */}
      <p>{text}
        <br></br>
        <span>{username}</span>
      </p>

    </div>
  )
}

function NavBar() {

  var user = firebase.auth().currentUser;
  var name, email, photoUrl, uid, emailVerified;

if (user != null) {
  name = user.displayName;
  email = user.email;
  photoUrl = user.photoURL;
  emailVerified = user.emailVerified;
  uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                   // this value to authenticate with your backend server, if
                   // you have one. Use User.getToken() instead.
}

  return (
    <div class="nav">
      <div class="left">
      <FcMenu class="hamburger"/>
      </div>
      <div class="middle">
      <img src={Logo} alt="" class="logo"/>

      </div>
      <div class="right">
      {photoUrl && <img src={photoUrl} alt="" className="prof-photo"/>}

      </div>
    </div>
  )
}


export default App;
