import React from 'react';
import './App.css';
import Game from './components/Game'
// import {} from 'styled-components/cssprop'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Testing Socket.io
        </p>
        <Game />
      </header>
    </div>
  );
}

export default App;
