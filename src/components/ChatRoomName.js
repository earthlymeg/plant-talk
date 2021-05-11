
function ChatRoomName({ name, updateGroup, id, selected, setSelected }) {



    return (
      <div className={selected === id ? 'chat-selected' : 'chat-select'}
  
        onClick={
          () => {
            updateGroup(id)
            setSelected(id);
          }
        }>
        {name}
      </div>
    )
  }

  export default ChatRoomName;