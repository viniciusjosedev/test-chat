/**
 *
 * @param {import('sequelize').Sequelize} Sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 * @returns
 */

module.exports = (Sequelize, DataTypes) => Sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  timeConnected: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: new Date(),
  },
}, {
  tableName: 'users_project_msn_basic',
  timestamps: false,
  underscored: true,
});
