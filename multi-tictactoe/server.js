const app = require('express')();
const httpServer = require('http').createServer(app);
options = {
	cors: true,
};
const io = require('socket.io')(httpServer, options);

const PORT = process.env.PORT | 5000;

app.get('/', (req, res) => {
	res.send('Hello World');
});

const roomName = 'testRoom';
const roomNumber = 1;
const message = 'this is a test message'
const object = { description: 'this is a test object' }

io.on('connection', (socket) => {
	socket.join(roomName + roomNumber);
	io.sockets.in(room).emit('serverEvent', message);
});

httpServer.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`);
});
