
import firebase from './Firebase';
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from 'react-modal';


const auth = firebase.auth();

//todo
//make z index highest
//style border of modal
//stlye close button of modal
//style submit button of modal
//style all borders of modal
//style input form of modal 



function CreateGroup() {


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
  
          <h2 ref={_subtitle => (subtitle = _subtitle)}></h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("groupName")} />
  
            <input type="submit" />
          </form>
          <button onClick={closeModal}>close</button>
  
        </Modal>
  
      </div>
  
    )
  }

  export default CreateGroup;