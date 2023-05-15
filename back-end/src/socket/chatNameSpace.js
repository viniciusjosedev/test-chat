const logger = require('../utils/loggers');

module.exports = (io) => {

	const chatNameSpace = io.of('chat')

	// chatNameSpace.use((socket, next) => {
	// 	logger.info('verification');
	// 	next();
	// }) 

	chatNameSpace.on('connection', (socket) => {
		// socket.on()

		socket.on('connected', (username) => {
			socket.username = username;
			logger.info(`'${socket.username}' Logou`);
			socket.broadcast.emit('connected', socket.id)
			socket.join('chat');
		});
		
		socket.on('send', (data, id) => {
			// console.log(data);
			socket.to(id).emit('chat', data);
		})

		socket.on('disconnect', () => {
			// console.log('disconnect');
		})
	});
};
