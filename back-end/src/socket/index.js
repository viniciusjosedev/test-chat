module.exports = (server) => {
  const chatNameSpace = require('./chatNameSpace');
  const io = require('socket.io')(server, {
    cors: {
      origin: '*',
      method: ['GET', 'POST'],
    },
  });

  chatNameSpace(io);
};
