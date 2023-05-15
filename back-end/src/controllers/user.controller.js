const logger = require('../utils/loggers');
const userService = require('../services/user.service');

const createUser = async (req, res) => {
  try {
    const { username } = req.body;

    const result = await userService.findByUsername(username);

    if (!result) {
      await userService.createUser(username);
      logger.info(`Username ${username} created`);
      return res.status(201).json({ message: 'OK' });
    }

    if (result.dataValues.active) {
      logger.info(`Username ${username} in use`);
      return res.status(203).json({ message: 'IN USE' });
    }

    await userService.updateActive(username, true);

    logger.info('Username has already been created but not in use');
    return res.status(200).json({ message: 'OK' });
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ message: 'error internal', error: error.message });
  }
};

const updateActive = async (req, res) => {
  try {
    const { username, active } = req.query;

    await userService.updateActive(username, active === 'true');

    logger.info(`Update on user activity ${username}`);
    return res.status(202).json({ message: 'OK' });
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ message: 'error internal', error: error.message });
  }
};

const findBySearch = async (req, res) => {
  try {
    const { search, username } = req.query;
    const result = await userService.findBySearch(search.toLowerCase(), username);
    return res.status(200).json(result);
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ message: 'error internal', error: error.message });
  }
};

module.exports = {
  createUser,
  updateActive,
  findBySearch,
};
