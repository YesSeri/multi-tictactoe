import styled from 'styled-components';

export const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 100px 100px 100px;
	border: solid white 2px;
	border-radius: 3px;
  background-color: #fca311;
  font-size: 4rem;
	.square {
		color: #000000;
		border: solid #14213d 2px;
		height: 100px;
		display: flex;
		justify-content: center;
		align-items: center;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
`;
