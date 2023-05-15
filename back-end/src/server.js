const server = require('./app');
const io = require('./socket');
const logger = require('./utils/loggers');
const job = require('./jobs/job');

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  logger.info(`Running in port ${PORT}`);
});

io(server);
job();
