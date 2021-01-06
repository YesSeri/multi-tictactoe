import React, { useEffect, useState } from 'react';
import Game from './components/Game'
import socket from './components/Socket'
// CSS
import './App.css';

const uniqueString = require('unique-string');


// import {} from 'styled-components/cssprop'

type Room = {
  name: string,
  isX: boolean
}

function App() {
  // const [activeUsers, setActiveUsers] = useState<string>('0');
  const [room, setRoom] = useState<Room>({name: '', isX: false});
  const [inputValue, setInputValue] = useState<string>("");

  const handleCreateGameClick = () => {
    setRoom({name: uniqueString(), isX: true});
  }
  const handleJoinGameClick = () => {
    setRoom({name: inputValue, isX: false})
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value)
  }
  useEffect((): any => {
    return () => {
      socket.disconnect()
    };
  }, [])
  useEffect((): any => {
    if (room.name !== "") {
      socket.emit('join', room);
    }
  }, [room.name]);
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
          <input type="text" onChange={handleChange} value={inputValue} />
        </form>
        <Game />
      </header>
    </div>
  );
}

export default App;
