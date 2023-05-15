const logger = require('../utils/loggers');

module.exports = (io) => {
  const chatNameSpace = io.of('chat');

  chatNameSpace.on('connection', (socket) => {
    socket.on('connected', (username) => {
      socket.username = username;
      logger.info(`'${socket.username}' Logou`);
    });

    socket.on('joinRoom', (room) => {
      socket.join(room);
      logger.info(`${socket.username} join in room ${room}`);
    });

    socket.on('sendMessage', (message, room) => {
      socket.to(room).emit('getMessage', message);
      logger.info(`${socket.username}: ${message}`);
    });

    socket.on('disconnect', () => {
      logger.info(`${socket.username} logout`);
    });
  });
};
