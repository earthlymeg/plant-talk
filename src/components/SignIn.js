import firebase from './Firebase';
import { FcGoogle } from "react-icons/fc";
import Logo from '../assets/plant-talk-logo.png'


function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  const auth = firebase.auth();

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

export default SignIn;