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
    this.clientX = clientX;
    this.clientO = clientO;
  }
  isRoomFull(){
    return (this.clientX && this.clientO) 
  }
}

let rooms = [];

io.on('connection', (socket) => {
  console.log('All current rooms: ', rooms)
	socket.on('join', (clientRoom) => { // Will have three fields. One is room.name. The other is room.join and is a boolean. If true join room else create room. Last one is isX. Is only used when creating room, for making player able to choose char.
    if (room.join){ // If room exists we join that room. 
      let tempRoom;
      console.log('Joining room', room.name) //Need to find room and add user to it.
      for (room in rooms) {
        if ( clientRoom.name === room.name ) { 
          tempRoom = {...clientRoom}
          console.log(tempRoom)
        }
      }
    } else { // If not we create a new room that someone else can join
      console.log('Creating room', clientRoom.name)
      const tempClientRoom = new Room(clientRoom.name, clientRoom.isX, !clientRoom.isX)
      rooms.push(tempClientRoom);
    }
    
		socket.join(room);
		console.log('room: ', room)
  });
});

function roomExists(newRoomName) { // Rooms is global
  for (let room of rooms) {
    if (room.name === newRoomName) {
      return false;
    }
  }
  return true;
}

httpServer.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`);
});
