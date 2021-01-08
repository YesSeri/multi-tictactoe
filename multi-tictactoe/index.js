const app = require('express')();
const httpServer = require('http').createServer(app);
const options = {
	cors: true,
};
const io = require('socket.io')(httpServer, options);

const PORT = process.env.PORT | 5000;
//app.get('/', (req, res) => {
//	res.send('Hello World');
//});

class Room {
	constructor(name, clientX, clientO) {
		this.name = name;
		this.clientX = clientX; //socket
		this.clientO = clientO; //socket
		this.gameLogic = new GameLogic();
	}
	isFull() {
		return this.clientX && this.clientO;
	}
	toString() {
		const string = `Name: ${this.name}, clientX: ${
			this.clientX !== false
		}, clientO: ${this.clientO !== false} `;
		return [string, this.gameLogic.toString()];
	}
}

class GameLogic {
	constructor() {
		this.squares = Array(9).fill(null);
		this.xTurn = true;
	}
	static get MAX_TURNS() {
		return 9;
	}
	toString() {
		const squares = this.squares;
		let string = `\nPlaying Field
      ${squares[0] ? squares[0] : '-'} ${squares[1] ? squares[1] : '-'} ${
			squares[2] ? squares[2] : '-'
		}
      ${squares[3] ? squares[3] : '-'} ${squares[4] ? squares[4] : '-'} ${
			squares[5] ? squares[5] : '-'
		}
      ${squares[6] ? squares[6] : '-'} ${squares[7] ? squares[7] : '-'} ${
			squares[8] ? squares[8] : '-'
		}
    `;
		return [string, `\nIt is X turn: ${this.xTurn}`];
	}
}

let rooms = [];
let y = 0;

io.on('connection', (socket) => {
	socket.on('create', (roomName) => {
		// If not we create a new room that someone else can join
		createRoom(roomName);
	});

	const createRoom = (roomName) => {
		const newRoom = new Room(roomName, socket, false);
		socket.join(newRoom.name);
		rooms.push(newRoom);
	};

	socket.on('join', (roomName) => {
		// Has only a name.
		let room;
		for (tempRoom of rooms) {
			if (tempRoom.name === roomName) {
				// If the room already exists we join it. Else we create it.
				room = tempRoom;
				break;
			}
		}
		if (room && !room.isFull()) {
			joinRoom(room);
		} else {
			emitConsole('Room is full already, cant join room: ', room.name);
		}
	});
	const joinRoom = (room) => {
		if (room.clientO === false) {
			room.clientO = socket;
		} else {
			emitConsole(`ClientO already taken in: `, room.name);
		}
		socket.join(room.name);
		if (room.isFull()) {
			// If room is not full something has gone wrong, for example a player leaving. This needs to be handled. Take care of this later
			startGame(room);
		}
	};
});

const startGame = (room) => {
	emitConsole(`Game starting.\nGame info: ${room.toString()}`, room.name);
	io.to(room.name).emit('startGame', 'LETS START GAME');
	for (let i = 0; i < room.gameLogic.MAX_TURNS; i++) {
		if (x.gameLogic.xTurn === true) {
      const activePlayer = room.clientX
      const passivePlayer = room.clientO
      sendTurnInfo(activePlayer, passivePlayer); // First one is whose turn it is.
			io.activePlayer.on('move', (move) => {
        console.log(move)
        activePlayer.off('move')
      });
		}
		nextTurn(room.gameLogic);
	}
};
const sendTurnInfo = (active, passive) => {
	io.active.emit('yourTurn', true);
	io.passive.emit('yourTurn', false);
};
const receiveMove = (roomName) => {};
const nextTurn = (gameLogic) => {};

function emitConsole(text, roomName) {
	console.log(text);
	io.to(roomName).emit('console', text);
}
httpServer.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`);
});
