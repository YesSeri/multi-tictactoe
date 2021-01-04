import React from 'react';
import './App.css';
import Game from './components/Game'
const uniqueString = require('unique-string');


// import {} from 'styled-components/cssprop'

function App() {
  const roomNumber = "123"
  return (
    <div className="App">
      <p>Room name: {roomNumber} (for testing name: 123) </p>
      <header className="App-header">
        <p>
          Testing Socket.io
        </p>
        <Game roomNumber={roomNumber}/>
      </header>
    </div>
  );
}

export default App;
