import firebase from './Firebase';
import cat from '../assets/cat.jpg';
const auth = firebase.auth();



function ChatMessage(props) {
    const { text, uid, date, username, thumbnail } = props.message;
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
    const user = auth.currentUser;
    return (
      <div className={`message ${messageClass}`}>
        {/* //user that sent messagae */}
        <img src={thumbnail} alt='' className="msg-photo"
    
        />
        <p>{text}
          <br></br>
          <span>{username}</span>
        </p>
  
      </div>
    )
  }

  export default ChatMessage; 