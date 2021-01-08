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

	return (
		<Wrapper className="wrapper">
			{squares.map((_, i) => <Square onClick={() => handleClick(i)} value={squares[i]} key={i} />)}
		</Wrapper>
	);
};

export default Board;
