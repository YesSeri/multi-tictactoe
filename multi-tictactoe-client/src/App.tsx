import React, {useEffect, useState} from 'react';
import './App.css';
import Game from './components/Game'
import socketIOClient from 'socket.io-client';
const ENDPOINT = 'http://127.0.0.1:5000';
const uniqueString = require('unique-string');


// import {} from 'styled-components/cssprop'

const socket: SocketIOClient.Socket = socketIOClient(ENDPOINT);
function App() {
	const [activeUsers, setActiveUsers] = useState<string>('0');
  const roomNumber = uniqueString()
	useEffect((): any => {
		socket.on('serverEvent', (data: string) => {
      console.log(data)
		});
		return socket.disconnect;
	}, []);
  return (
    <div className="App">
      <p>Room name: {roomNumber} (for testing name: 123) </p>
      <header className="App-header">
      <button>Create Game</button>
      <button>Join Game</button>
        <p>
          Testing Socket.io
        </p>
        <Game roomNumber={roomNumber}/>
      </header>
    </div>
  );
}

export default App;
