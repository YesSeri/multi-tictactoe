import React, { useState, useEffect } from 'react';
import Board from './Board';
import { SquareValue } from './Board';
import { testWinner, testDraw } from './utils';

enum Player {
	X = 'X',
	O = 'O',
}

type GameProps = {
	roomNumber: string;
};

const Game: React.FC<GameProps> = () => {
	const [squares, setSquares] = useState<Array<SquareValue>>(
		Array(9).fill(null)
	);

	const [xIsNext, setXIsNext] = useState<Boolean>(true);
	const [turn, setTurn] = useState<number>(1)
	const nextPlayer = xIsNext ? Player.X : Player.O;
	const winner = testWinner(squares);
	const isDraw = testDraw(turn)
	const status = winner ? `Winner: ${winner}` : isDraw ? `It is a draw.` : `Next player: ${nextPlayer}`;

	const handleClick = (i: number) => {
		if (winner || squares[i] || isDraw) return;
		setTurn(turn + 1);
		const newSquares = squares.slice();
		newSquares[i] = nextPlayer;
		setSquares(newSquares);
		setXIsNext(!xIsNext);
	};
	return (
		<div>
			{isDraw || winner ? "Game over" :<div>It is turn {turn} </div>}
			<p style={{ textAlign: 'center' }}>{status}</p>
			<Board handleClick={handleClick} squares={squares} />
		</div>
	);
};

export default Game;
