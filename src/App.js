import React, { useState, useEffect } from "react";
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData, useCollection } from 'react-firebase-hooks/firestore';
import reactDom from "react-dom";

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
    ref.onSnapshot( (snap) => 
      { 
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
      uid

    }).then( () => console.log('successful post by', auth.currentUser.displayName))
    .catch( err => console.log(err))

    setFormVal('');
  }

  
  return (
    <>
    <div>
      {messages && messages.map(msg => 
      <ChatMessage key={msg.id} message={msg} />
      )}
    </div>

    <form>
      <input value={formVal} onChange={(e) => setFormVal(e.target.value)}/>
      <button type="submit" onClick={sendMessage}>🟢</button>
    </form>
    </>
  )
}

function ChatMessage(props) {
  const { text, uid } = props.message;
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  return (
    <div className={`message ${messageClass}`}>
    {/* add image here */}
      <p>{text}</p>{auth.currentUser.displayName}
    </div>
  )
}


export default App;
