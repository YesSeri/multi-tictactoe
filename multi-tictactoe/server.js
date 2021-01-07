const app = require('express')();
const httpServer = require('http').createServer(app);
options = {
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
  // console.log('All current rooms: ', rooms)

  socket.on('create', (roomName) => { // If not we create a new room that someone else can join
    console.log('Creating room', roomName)
    socket.join(roomName);
    const newRoom = new Room(roomName, socket, false)
    rooms.push(newRoom);
    y++;
    emitConsole(`Test Message sent ${y} time`, roomName)
  })
  socket.on('join', (roomName) => { // Has only a name.
    let tempRoom;
    for (room of rooms) {
      if (room.name === roomName) { // If the room already exists we join it. Else we create it.
        tempRoom = room;
        break;
      }
    }
    if (tempRoom.isFull()) {
      emitConsole("Room is full already, cant join", roomName)
    } else {
      emitConsole('Joining room: ' + tempRoom.name, roomName)
      tempRoom.clientO = socket;
      socket.join(roomName);
      if (tempRoom.isFull()) {
      }
    }

    y++;
    emitConsole(`Test Message sent ${y} time`, roomName)
  });
});

function emitConsole(text, roomName) {
  console.log(text)
  io.to(roomName).emit('console', text);
}
httpServer.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
