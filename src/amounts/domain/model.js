const { DataTypes, Model } = require('sequelize');
const db = require('../../database/domain');

class Amounts extends Model {}
Amounts.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  paid: {
    type: DataTypes.STRING(30),
    allowNull: true,
    defaultValue: 0
  },
  unPaid: {
    type: DataTypes.DECIMAL(8,2),
    allowNull: false
  },
  notPayed: {
    type: DataTypes.DECIMAL(20,2),
    defaultValue: 0,
    allowNull: true,
  }

}, {sequelize: db, modelName: 'amounts'});

module.exports = Amounts;