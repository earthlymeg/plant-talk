import React, { useState, useEffect } from "react";
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'

import { useAuthState } from 'react-firebase-hooks/auth';
import reactDom from "react-dom";

import { IoSend } from 'react-icons/io5';
import { FcMenu } from "react-icons/fc";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";


import Modal from 'react-modal';
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

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  //use auth state react/firebase hooks
  const [user] = useAuthState(auth);
  const [currentChat, setCurrentChat] = useState('')
  const updateGroup = (e) => {
    setCurrentChat(e);
    console.log('currentchat', currentChat)
  }

  return (

    <div className="App">
      <header>

      </header>
      {user && <NavBar updateGroup={updateGroup}/>}
      <section>
        {user ? <ChatRoom groupSelected={currentChat}/> : <SignIn />}
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
    <div className="sign-in">
      {/* <div className="sign-in-decorate">
        <span className="sign-in-text">A space for conscious & <br></br>compassionate communication</span>
        
      </div> */}

      <div className="google-button">
        <img src={Logo} className="sI-logo"></img>
        <button onClick={signInWithGoogle} className="google-legit-button">Sign in with <FcGoogle /></button>
        <button onClick={signInWithGoogle} className="google-button-sml"><FcGoogle /></button>
      </div>
    </div>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom({groupSelected}) {

  // const ref = firebase.firestore().collection("messages").where("groupId", "==", groupSelected).orderBy('date', 'desc');
  const ref = firebase.firestore().collection("messages").where("groupId", "==", groupSelected).orderBy('date', 'desc');;

  const [messages, setMessages] = useState([]);
  const [formVal, setFormVal] = useState('');

  useEffect(() => {
    ref.onSnapshot((snap) => {
      setMessages(snap.docs.map(doc => doc.data()));
      console.log(groupSelected, 'group selected')
    }
    );

  }, [groupSelected]);
  

  const sendMessage = (e) => {
    e.preventDefault();

    //later add photo id
    const { uid } = auth.currentUser;
    firebase.firestore().collection("messages").add({
      text: formVal,
      date: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      username: auth.currentUser.displayName,
      groupId: groupSelected,

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

function NavBar(props) {

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
  var subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [overlayIsOpen, setOverlayOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  function toggleOverlay() {
    setOverlayOpen(!overlayIsOpen);
  }


  return (
    <div class="nav">
      <div class="left">
        <FcMenu class="hamburger" onClick={toggleOverlay} />
        {overlayIsOpen && <OverLay updateGroup={props.updateGroup}/>}
      </div>
      <div class="middle">
        <img src={Logo} alt="" class="logo" />

      </div>
      <div class="right">
        {photoUrl && <img src={photoUrl} alt="" className="prof-photo" onClick={openModal} />}
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <h2 ref={_subtitle => (subtitle = _subtitle)}></h2>
          <SignOut />
          <button onClick={closeModal}>close</button>
        </Modal>

      </div>
    </div>
  )
}

function OverLay({updateGroup}) {

  //iterate over documnts in group collection and render a chatroomname comnponent for each collection
  const ref = firebase.firestore().collection("groups").orderBy('date');
  const [groups, setGroups] = useState([]);



  useEffect(() => {
    ref.onSnapshot((snap) => {
      setGroups(snap.docs.map(doc => {
        let obj = {
          id: doc.id,
          data: doc.data()
        }
        return obj;

      }));

    }
    )

  }, []);


  return (

    <div className="overlay">
      {groups && groups.map(({id, data}) => {
        // console.log('group from iteration', group)
        return <ChatRoomName key={id} name={data.name} updateGroup={updateGroup} id={id}/>
      })}
      <CreateGroup />
    </div>
  )
}


function ChatRoomName({name, updateGroup, id}) {

  return (
    <div className="chat-select">
      {name}
      <button onClick={() => updateGroup(id)}>Update Group Name</button>
    </div>
  )
}

function CreateGroup() {



  const addGroup = (data) => {
    console.log(data)
    firebase.firestore().collection("groups").add({
      created_by: data.createdBy,
      date: firebase.firestore.FieldValue.serverTimestamp(),
      name: data.groupName,
      type: data.type,
      members: data.members,

    }).then(() => console.log('successful post by', auth.currentUser.displayName))
      .catch(err => console.log(err))
  }

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    data['createdBy'] = auth.currentUser.uid;
    data['members'] = [auth.currentUser.uid];
    addGroup(data);
  }


  var subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div>
      <div className="add-chat-btn" onClick={openModal}>+</div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >

        <h2 ref={_subtitle => (subtitle = _subtitle)}></h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("groupName")} />
          <select {...register("type")} id="groups">
            <option value="Just For Fun">Just For Fun</option>
            <option value="Business">Business</option>
            <option value="Love">Love</option>
            <option value="Family">Family</option>
            <option value="Friends">Friends</option>
          </select>
          <input type="submit" />
        </form>
        <button onClick={closeModal}>close</button>

      </Modal>

    </div>

  )
}


export default App;
