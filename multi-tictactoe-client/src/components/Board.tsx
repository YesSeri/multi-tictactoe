import React, { useState, useEffect } from 'react';
import { Wrapper } from './Board.styles';

type SquareValue = 'X' | 'O' | null;

type SquareProps = {
	value: SquareValue;
	onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

enum Player {
	X = 'X',
	O = 'O',
}

const Square = ({ value, onClick }: SquareProps) => {
	return (
		<div onClick={(e) => onClick(e)} className="square">
			{value}
		</div>
	);
};

const Board = () => {
	const [squares, setSquares] = useState<Array<SquareValue>>(
		Array(9).fill(null)
	);

	const [xIsNext, setXIsNext] = useState<Boolean>(true);
	const nextPlayer = xIsNext ? Player.X : Player.O;
	const winner = getWinner(squares);
	const status = winner ? `Winner: ${winner}` : `Next player: ${nextPlayer}`;

	const handleClick = (i: number) => {
		if (winner) return;
		const newSquares = squares.slice();
		newSquares[i] = nextPlayer;
		setSquares(newSquares);
		setXIsNext(!xIsNext);
	};

	const renderSquare = (i: number) => {
		return <Square onClick={() => handleClick(i)} value={squares[i]} />;
	};

	const renderAllSquares = () => {
		return squares.map((square, i) => {
			renderSquare(i);
		});
	};
	return (
		<>
			<p style={{textAlign: 'center'}}>{status}</p>
			<Wrapper className="wrapper">
				{squares.map((_, i) => renderSquare(i))}
			</Wrapper>
		</>
	);
};
const getWinner = (squares: Array<SquareValue>) => {
	const lines: Array<Array<number>> = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
};
export default Board;
