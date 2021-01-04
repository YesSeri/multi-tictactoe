import React, { useEffect, useState } from 'react';
import Game from './components/Game'
import socket from './components/Socket'
// CSS
import './App.css';

const uniqueString = require('unique-string');


// import {} from 'styled-components/cssprop'

type RoomName = string

function App() {
  // const [activeUsers, setActiveUsers] = useState<string>('0');
  const [room, setRoom] = useState<RoomName>("");
  const [value, setValue] = useState<RoomName>("");

  const handleCreateGameClick = () => {
    setRoom(uniqueString());
  }
  const handleJoinGameClick = () => {
    setRoom(value)
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value)
    console.log(e.target.value)
  }
  useEffect((): any => {
    return () => {
      socket.disconnect()
    };
  }, [])
  useEffect((): any => {
    if (room !== "") {
      socket.emit('join', room);
    }
  }, [room]);
  return (
    <div className="App">
      <header className="App-header">
        <p>Room name: {room}</p>
        <div style={{ display: "flexbox" }}>
          <button onClick={handleCreateGameClick}>Create Game</button>
          <button onClick={handleJoinGameClick}>Join Game</button>
        </div>
        <form>
          <label>Enter Join Code</label><br></br>
          <input type="text" onChange={handleChange} value={value} />
        </form>
        <Game />
      </header>
    </div>
  );
}

export default App;
