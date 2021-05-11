import firebase from './Firebase';
import React, { useState, useEffect } from "react";
import { FcMenu } from "react-icons/fc";
import Logo from '../assets/plant-talk-logo.png'
import Modal from 'react-modal';
import SignOut from './SignOut';
import OverLay from './Overlay';
const auth = firebase.auth();


function NavBar({ updateGroup }) {

    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;
    const [selected, setSelected] = useState(null);


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
                {overlayIsOpen && <OverLay updateGroup={updateGroup} selected={selected} setSelected={setSelected} />}
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

export default NavBar;