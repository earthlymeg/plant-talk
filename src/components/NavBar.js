import firebase from './Firebase';
import React, { useState, useEffect } from "react";
import { FcMenu } from "react-icons/fc";
import Logo from '../assets/plant-talk-logo.png'
import SignOut from './SignOut';
import OverLay from './Overlay';
const auth = firebase.auth();


function NavBar({ updateGroup,toggleOverlay,overlayIsOpen }) {

    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;
    const [selected, setSelected] = useState(null);

    if (user != null) {
        name = user.displayName;
        email = user.email;
        photoUrl = user.photoURL;
        emailVerified = user.emailVerified;
        uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getToken() instead.
    }
    return (
        <div className="nav">
            <div className="left">
                <FcMenu className="hamburger" />
                {<OverLay updateGroup={updateGroup} selected={selected} setSelected={setSelected} />}
            </div>
            <div className="middle">
                <img src={Logo} alt="" className="logo" />

            </div>
            <div className="right">
                {photoUrl && <img src={photoUrl} alt="" className="prof-photo"/>}
                <SignOut />

            </div>
        </div>
    )
}

export default NavBar;