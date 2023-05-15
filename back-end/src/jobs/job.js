const schedule = require('node-schedule');
const moment = require('moment');
const logger = require('../utils/loggers');
const userService = require('../services/user.service');

module.exports = () => {
  schedule.scheduleJob('0 0 * * *', async () => {
    logger.info('Start job');
    const result = await userService.findByActive();

    if (result.length > 0) {
      const listaParaRemover = result.filter((e) => {
        const dateBD = moment(e.dataValues.timeConnected);
        const dateNow = moment(new Date());
        const difference = dateNow.diff(dateBD, 'days');
        if (difference >= 2) return true;
        return false;
      });
      await Promise.all(listaParaRemover
        .map(({ dataValues: { username } }) => userService.updateActive(username, false)));
    }

    logger.info('End job');
    logger.info('Next job in 24 hours');
  });
  logger.info('Set job');
};
