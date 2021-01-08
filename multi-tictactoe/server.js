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
    this.logic = new GameLogic
  }
  isFull() {
    return (this.clientX && this.clientO)
  }
  toString() {
    return [
      this.name, this.clientX !== false, this.clientO !== false, this.logic
    ]
  }
}

class GameLogic {
  constructor() {
    this.squares = Array(9).fill(null);
    this.xTurn = true;
  }

}

let rooms = [];
let y = 0;

io.on('connection', (socket) => {
  socket.on('create', (roomName) => { // If not we create a new room that someone else can join
    createRoom(roomName)
  })

  const createRoom = (roomName) => {
    const newRoom = new Room(roomName, socket, false)
    socket.join(newRoom.name);
    rooms.push(newRoom);
  }

  socket.on('join', (roomName) => { // Has only a name.
    let room;
    for (possibleRoom of rooms) {
      if (possibleRoom.name === roomName) { // If the room already exists we join it. Else we create it.
        room = possibleRoom;
        break;
      }
    }
    debugger;
    if (room && !room.isFull()) {
      joinRoom(room)
    } else {
      emitConsole("Room is full already, cant join room: ", room.name)
    }
  });
  const joinRoom = (room) => {
    if (room.clientO === false) {
      room.clientO = socket;
    } else {
      emitConsole(`ClientO already taken in: `, room.name)
    }
    socket.join(room.name);
    startGame(room);
  }
});

const startGame = (room) => {
  emitConsole(`Starting game in: ${room.toString()}`, room.name)
  io.to(room.name).emit('startGame', "LETS START GAME");
}

function emitConsole(text, roomName) {
  console.log(text)
  io.to(roomName).emit('console', text);
}
httpServer.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
