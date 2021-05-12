import firebase from './Firebase';
import { useState, useEffect } from "react";
import { IoSend } from 'react-icons/io5';
import ChatMessage from './ChatMessage';

function ChatRoom({ groupSelected, overlayIsOpen }) {

    const auth = firebase.auth();

    const ref = firebase.firestore().collection("messages").where("groupId", "==", groupSelected).orderBy('date');
  
    const [messages, setMessages] = useState([]);
    const [formVal, setFormVal] = useState('');
  
    useEffect(() => {
      ref.onSnapshot((snap) => {
        setMessages(snap.docs.map(doc => doc.data()));
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
        <div className={overlayIsOpen ? "chat-room-width": "chat-room"}>
          <div className="all-messages">
            {messages && messages.map(msg =>
              <ChatMessage key={msg.id} message={msg} date={msg.date} username={msg.username} />
            )}
          </div>
    
          <form>
            <input placeholder="Your message..." value={formVal} onChange={(e) => setFormVal(e.target.value)} />
            <button className="submit-button" type="submit" onClick={sendMessage}><IoSend /></button>
          </form>
        </div>
      )
    }

    export default ChatRoom;