import React from 'react';
import { Wrapper } from './Board.styles';

export type SquareValue = 'X' | 'O' | null;

type SquareProps = {
	value: SquareValue;
	onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const Square = ({ value, onClick }: SquareProps) => {
	return (
		<div onClick={(e) => onClick(e)} className="square">
			{value}
		</div>
	);
};

type BoardsProps = {
	squares: Array<SquareValue>;
	handleClick: (i: number) => void;
}

const Board: React.FC<BoardsProps> = ({ squares, handleClick }: BoardsProps) => {

	const renderSquare = (i: number) => {
		return <Square onClick={() => handleClick(i)} value={squares[i]} key={i} />;
	};

	return (
		<Wrapper className="wrapper">
			{squares.map((_, i) => renderSquare(i))}
		</Wrapper>
	);
};

export default Board;
