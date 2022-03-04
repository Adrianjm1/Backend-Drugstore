const { DataTypes, Model } = require('sequelize');
const db = require('../../database/domain');

class User extends Model {}
User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  identification: {
    type: DataTypes.STRING(15),
    allowNull: false
  },
  username: {
    type: DataTypes.STRING(15),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(80),
    allowNull: false
  },
  viewer: {
    type: DataTypes.INTEGER(),
    allowNull: false

  },

}, {sequelize: db, modelName: 'user'});

module.exports = User;