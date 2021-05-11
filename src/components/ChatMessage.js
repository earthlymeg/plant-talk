import firebase from './Firebase';
const auth = firebase.auth();



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

  export default ChatMessage; 