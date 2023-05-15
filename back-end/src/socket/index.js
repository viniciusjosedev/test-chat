const socket = require('socket.io');
const chatNameSpace = require('./chatNameSpace');

module.exports = (server) => {
  const io = socket(server, {
    cors: {
      origin: '*',
      method: ['GET', 'POST'],
    },
  });

  chatNameSpace(io);
};
