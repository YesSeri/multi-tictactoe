const app = require('express')();
const httpServer = require('http').createServer(app);
options={
  cors:true,
 };
const io = require('socket.io')(httpServer, options);


const PORT = process.env.PORT | 5000;

app.get('/', (req, res) => {
  res.send("Hello World");
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.emit("test", "this is a test");
});

httpServer.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});