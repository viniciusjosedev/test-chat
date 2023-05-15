const pino = require('pino');

const logger = pino({
  timestamp: true,
  transport: {
    target: 'pino-pretty',
    options: {
      ignore: 'pid,hostname',
      colorize: true,
      // customColors: 'error:red,info:green,warn:yellow,fatal:red,debug:blue,trace:white',
      timestampKey: 'time',
      colorizeObjects: true,
    },
  },
});

module.exports = logger;
