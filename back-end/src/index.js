
const express = require('express');
const { createServer } = require('http');
const cors = require('cors');

const app = express();
const server = createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  // console.log('test');
  res.send();
})

io.on('connect', (socket) => {

	socket.on('typing', () => {
		console.log('typing');
		socket.emit('typing');
	})

	socket.on('send', (value) => {
		console.log('teste');
		socket.broadcast.emit('get', value);
	})
})

server.listen(process.env.PORT, () => {
	console.log('Running in port', process.env.PORT);
})
