import React, { useEffect, useState } from 'react';
import Game from './components/Game'
import socket from './components/Socket'
// CSS
import './App.css';

const uniqueString = require('unique-string');


// import {} from 'styled-components/cssprop'

function App() {
  // const [activeUsers, setActiveUsers] = useState<string>('0');
  const [room, setRoom] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");

  const handleCreateGameClick = () => {
    setRoom(uniqueString());
  }
  const handleJoinGameClick = () => {
    socket.emit('join', room);
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value)
  }
  useEffect((): any => {
    socket.on('console', (data: string) => {
      console.log(data)
    })
    return () => {
      socket.disconnect()
    };
  }, [])
  useEffect((): any => {
    socket.emit('create', room);
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
          <input type="text" onChange={handleChange} value={inputValue} />
        </form>
        <Game />
      </header>
    </div>
  );
}

export default App;
