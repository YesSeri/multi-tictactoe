import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import Board from './Board';
import { SquareValue } from './Board';
import { testWinner } from './utils';
const ENDPOINT = 'http://127.0.0.1:5000';

enum Player {
	X = 'X',
	O = 'O',
}

type GameProps = {
	roomNumber: string;
};

type Payload = {
  description: string
}

const socket: SocketIOClient.Socket = socketIOClient(ENDPOINT);
const Game: React.FC<GameProps> = () => {
	const [squares, setSquares] = useState<Array<SquareValue>>(
		Array(9).fill(null)
	);

	const [xIsNext, setXIsNext] = useState<Boolean>(true);
	const [activeUsers, setActiveUsers] = useState<string>('0');
	const nextPlayer = xIsNext ? Player.X : Player.O;
	const winner = testWinner(squares);
	const status = winner ? `Winner: ${winner}` : `Next player: ${nextPlayer}`;

	useEffect((): any => {

    
		socket.on('serverEvent', (data: string) => {
      setActiveUsers(data);
    });

		// socket.on('users', (payload: string) => {
		// 	console.log(payload);
		// 	setActiveUsers(payload);
		// });
		return socket.disconnect;
	}, []);

	const handleClick = (i: number) => {
		if (winner) return;
		const newSquares = squares.slice();
		newSquares[i] = nextPlayer;
		setSquares(newSquares);
		setXIsNext(!xIsNext);
	};
	return (
		<div>
			<p>{activeUsers}</p>
			<p style={{ textAlign: 'center' }}>{status}</p>
			<Board handleClick={handleClick} squares={squares} />
		</div>
	);
};

export default Game;
