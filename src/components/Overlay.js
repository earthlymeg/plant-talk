import firebase from './Firebase';
import React, { useState, useEffect } from "react";
import ChatRoomName from './ChatRoomName';
import CreateGroup from './CreateGroup'
function OverLay({ updateGroup, selected, setSelected }) {

  //iterate over documnts in group collection and render a chatroomname comnponent for each collection
  const ref = firebase.firestore().collection("groups").orderBy('date');
  const [groups, setGroups] = useState([]);
 
  useEffect(() => {
    ref.onSnapshot((snap) => {
      setGroups(snap.docs.map(doc => {
        let obj = {
          id: doc.id,
          data: doc.data()
        }
        return obj;

      }));

    }
    )
    
  });


  return (
    //lets render a classname based on screen size 
    // <div className={media ? "overlay" : "overlay-mobile"}>
    <div className="overlay">
      <div className="overlay_title">Chat</div>
      {groups && groups.map(({ id, data }) => {
        return <ChatRoomName key={id} name={data.name} updateGroup={updateGroup} id={id} selected={selected} setSelected={setSelected} />
      })}
      <CreateGroup />
    </div>
  )
}

export default OverLay;