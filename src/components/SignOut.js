import firebase from './Firebase';
import '../App.css';

function SignOut() {

  const auth = firebase.auth();

  return auth.currentUser && (
    <a className="sign-out-button" href="">

      <div className="logout" onClick={() => auth.signOut()}>LOGOUT</div>

    </a>
  )
}

export default SignOut;