const logger = require('../utils/loggers');
const userService = require('../services/user.service');

module.exports = (io) => {
  const chatNameSpace = io.of('chat');

  chatNameSpace.on('connection', (socket) => {
    socket.on('connected', (username) => {
      socket.username = username;
      logger.info(`'${username}' Logou`);
    });

    socket.on('joinRoom', (room, otherPeople) => {
      logger.info(`${socket.username} join in room ${room}`);

      const socketsNaSala = chatNameSpace.adapter.rooms.get(room);
      const listaOfSockets = socketsNaSala ? Array.from(socketsNaSala) : [];
      const listOfUsername = listaOfSockets.map((e) => chatNameSpace.sockets.get(e).username);

      console.log(listOfUsername);

      if (listOfUsername.length > 0) {
        socket.join(room);
        // socket.myRooms = room;
        socket.emit('getMessage', () => ({
          message: 'Conectado',
        }));
        socket.to(room).emit('getMessage', () => ({
          message: `${socket.username} se conectou`,
        }));
      } else {
        socket.join(room);
        // socket.myRooms = room;
        socket.emit('getMessage', () => ({
          message: 'Chat criado',
        }));

        socket.emit('getMessage', () => ({
          message: `Aguardando ${otherPeople}`,
        }));
      }
    });

    socket.on('sendMessage', (message) => {
      chatNameSpace.to(socket.myRooms[0]).emit('getMessage', message);
      logger.info(`${socket.username}: ${message}`);
    });

    socket.on('disconnect', async () => {
      try {
        if (socket.username) {
          await userService.updateActive(socket.username, false);
          logger.info(`${socket.username} logout`);
        }
      } catch (error) {
        logger.error(error.message);
      }
    });
  });
};
