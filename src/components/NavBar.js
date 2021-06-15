import firebase from './Firebase';
import React, { useState, useEffect } from "react";
import { FcMenu } from "react-icons/fc";
import Logo from '../assets/plant-talk-logo.png'
import SignOut from './SignOut';
import OverLay from './Overlay';
const auth = firebase.auth();
// import { ReactCSSTransitionGroup } from 'react-transition-group';

function NavBar({ updateGroup, toggleOverlay, overlayIsOpen }) {

    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;
    const [selected, setSelected] = useState(null);

    if (user != null) {
        name = user.displayName;
        email = user.email;
        photoUrl = user.photoURL;
        emailVerified = user.emailVerified;
        uid = user.uid;
    }

    let menu;
    if(overlayIsOpen) {
      menu = <OverLay updateGroup={updateGroup} selected={selected} setSelected={setSelected} />
    } else {
      menu = "";
    }

    return (
        <div className="nav" >
            <div className="left" id="menu">
                <FcMenu className="hamburger"
                    onClick={toggleOverlay}
                />

                
            </div>
            <div className="middle">
                <img src={Logo} alt="" className="logo" />

            </div>
            <div className="right">
                {photoUrl && <img src={photoUrl} alt="" className="prof-photo" />}
                <SignOut />

            </div>
        </div>
    )
}

export default NavBar;