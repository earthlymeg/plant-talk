import firebase from './Firebase';


function SignOut() {

    const auth = firebase.auth();

    return auth.currentUser && (
      <button onClick={() => auth.signOut()}>Sign Out</button>
    )
  }

  export default SignOut;