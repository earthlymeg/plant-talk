import React, { useState, useEffect } from "react";
import '../App.css';
import firebase from './Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import SignIn from './SignIn';
import ChatRoom from './ChatRoom';
import NavBar from './NavBar';
import Modal from 'react-modal';

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {

  const [user] = useAuthState(auth);
  const [currentChat, setCurrentChat] = useState('')
  const updateGroup = (e) => {
    setCurrentChat(e);
  }
  return (
    <div className="App">
      {user && <NavBar updateGroup={updateGroup} />}
      <section>
        {user ? <ChatRoom groupSelected={currentChat} /> : <SignIn />}
      </section>
    </div>
  );

}
 

export default App;
