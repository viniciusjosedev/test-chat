const { user, sequelize } = require('../models');

const findByActive = () => user.findAll({ where: { active: '1' } });

const findByUsername = (username) => user.findOne(
  { where: { username } },
);

const createUser = (username) => sequelize
  .transaction(async (t) => user.create({ username }, { transaction: t }));

const updateActive = (username, active) => sequelize
  .transaction(async (t) => user
    .update({ active, timeConnected: new Date() }, { where: { username }, transaction: t }));

module.exports = {
  findByUsername,
  createUser,
  updateActive,
  findByActive,
};
