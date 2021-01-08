import React, { useState } from 'react';
import Board from './Board';
import { SquareValue } from './Board';
import { testWinner, testDraw } from './utils';

export enum Player {
	X = 'X',
	O = 'O',
	None = 'A'
}

type GameProps = {
	myChar: Player;
	socket: SocketIOClient.Socket;
}
const Game: React.FC<GameProps> = ({ myChar, socket }) => {
	const [squares, setSquares] = useState<Array<SquareValue>>( // This is the latest move that has been made. 
		Array(9).fill(null)
	);

	const [xIsNext, setXIsNext] = useState<Boolean>(true);
	const [turn, setTurn] = useState<number>(1)
	const nextPlayer = xIsNext ? Player.X : Player.O;
	const winner = testWinner(squares);
	const isDraw = testDraw(turn)
	const status = winner ? `Winner: ${winner}` : isDraw ? `It is a draw.` : `Next player: ${nextPlayer}`;

	const handleClick = (i: number) => {
		if (winner || squares[i] || isDraw || nextPlayer !== myChar) return;
		setTurn(turn + 1);
		const newSquares = squares.slice();
		newSquares[i] = nextPlayer;
		setSquares(newSquares);
		setXIsNext(!xIsNext);
	};
	return (
		<div>
			<p style={{ textAlign: 'center' }}>
				{isDraw || winner ? "Game over" : `It is turn${turn}`}
			</p>
			<p style={{ textAlign: 'center' }}>{status}</p>
			<Board handleClick={handleClick} squares={squares} />
		</div>
	);
};

export default Game;
