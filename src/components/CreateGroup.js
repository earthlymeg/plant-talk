
import firebase from './Firebase';
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from 'react-modal';
import { AiOutlineCloseCircle } from "react-icons/ai"

const auth = firebase.auth();


function CreateGroup() {


  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '10px',
      backgroundColor: '#A9A9A9',
      width: '30rem'
    }
  };

  const addGroup = (data) => {
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
        <AiOutlineCloseCircle className="close-button-modal"onClick={closeModal}/>

        <h2 ref={_subtitle => (subtitle = _subtitle)}></h2>
        <form onSubmit={handleSubmit(onSubmit)} className="group-form">
          <input {...register("groupName")} className="group-input" />

          <input type="submit" className="group-submit" />
        </form>
        {/* <button onClick={closeModal}>close</button> */}

      </Modal>

    </div>

  )
}

export default CreateGroup;