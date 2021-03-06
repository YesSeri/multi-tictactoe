import React, { useEffect, useState } from 'react';
import Game from './components/Game'
import socket from './components/Socket'
// CSS
import './App.css';

// Typescript types
import { Player } from './components/Game'

// const uniqueString = require('unique-string');

function App() {
  const [displayRoom, setDisplayRoom] = useState<string>("");
  const [inputID, setInputID] = useState<string>("");
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [waitText, setWaitText] = useState<string>('Join or create a game');
  const [myChar, setMyChar] = useState<Player>(Player.None); //I have set this to the letter A.

  const handleCreateGameClick = () => {
    // const id = uniqueString();
    // charDisplayEmit(Player.X, id, "create")
    charDisplayEmit(Player.X, 'aaa123', "create")
    setWaitText("Game created, waiting for 2nd player to join")
  }

  const handleJoinGameClick = () => {
    // charDisplayEmit(Player.O, inputID, 'join')
    charDisplayEmit(Player.O, 'aaa123', 'join')
  }

  const charDisplayEmit = (player: Player, id: string, action: string) => {
    setMyChar(Player.X)
    setDisplayRoom(id);
    socket.emit(action, id);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputID(e.target.value)
  }

  useEffect((): any => { // Runs at first render
    socket.on('console', (data: any) => {
      console.log(data)
    })
    socket.on('startGame', (data: any) => { // When two players have joined this get emitted from the server.
      setGameStarted(true)
      console.log(data)
    })
    return () => {
      socket.disconnect()
    };
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <p>Room name: {displayRoom}</p>
        <div style={{ display: "flexbox" }}>
          <button onClick={handleCreateGameClick}>Create Game</button>
          <button onClick={handleJoinGameClick}>Join Game</button>
        </div>
        <form>
          <label>Enter Join Code</label><br></br>
          <input type="text" onSubmit={e => { e.preventDefault(); }} onChange={handleChange} value={inputID} />
        </form>
        {gameStarted ? <Game myChar={myChar} socket={socket}/> : waitText }
      </header>
    </div>
  );
}

export default App;
