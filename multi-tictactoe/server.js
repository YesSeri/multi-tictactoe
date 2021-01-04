const app = require('express')();
const httpServer = require('http').createServer(app);
options = {
  cors: true,
};
const io = require('socket.io')(httpServer, options);


const PORT = process.env.PORT | 5000;

app.get('/', (req, res) => {
  res.send("Hello World");
});
let y = 0
io.on('connection', (socket) => {
		io.emit('users', y);
  socket.on('users', (info) => {
		io.emit('users', info);
	});
  y++;
  console.log('a user connected: ' + y);
  socket.on("disconnect", (reason) => {
    y--;
    console.log('a user DC: ' + y);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});