import './App.css';
import io from 'socket.io-client';
import { useState } from "react";
import Chat from './Chat';

const socket = io.connect("http://localhost:3001");

function App() {

  //represents state / room
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  }

  return (
    <div className="App">
      <div className="container">
      {!showChat ? (
        <><h1>Real-Time Chat</h1><input type="text" placeholder="John" onChange={(event) => {
            setUsername(event.target.value);
          } } /><input type="text" placeholder="Room ID" onChange={(event) => {
            setRoom(event.target.value);
          } } /><button className="join" onClick={joinRoom}>Join Chat</button></>
        ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
      </div>
    </div>
  );
}

export default App;