import React, { useState,  } from "react";
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
  const [currentChat, setCurrentChat] = useState(null)
  const [overlayIsOpen, setOverlayOpen] = useState(false);

  const updateGroup = (e) => {
    setCurrentChat(e);
  }

  function toggleOverlay() {
    setOverlayOpen(!overlayIsOpen);
  }

  return (
    <div className="App">
      {user && <NavBar updateGroup={updateGroup} overlayIsOpen={overlayIsOpen} toggleOverlay={toggleOverlay}/>}
      <section>
        {user ? <ChatRoom groupSelected={currentChat} overlayIsOpen={overlayIsOpen}/> : <SignIn />}
      </section>
    </div>
  );

}


export default App;
