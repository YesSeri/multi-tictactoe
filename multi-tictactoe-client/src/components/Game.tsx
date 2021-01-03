import React, {useState, useEffect} from 'react';
import socketIOClient from "socket.io-client";
import Board from './Board'
const ENDPOINT = "http://127.0.0.1:5000";

type Test = {
  info: string
}

const Game: React.FC = () => {
  // const [user, setUser] = useState<IUser>({name: 'Jon'});
  // Usestate in typescript
  const [data, setData] = useState<Test | string>("")
  useEffect(() => {
    console.log('useeffect')
    const socket = socketIOClient(ENDPOINT);
    socket.on("test", (info: Test) => {
      setData(info);
    })
  }, []);
  return (
    <div>
      <Board />
    </div>
  );
}

export default Game;
