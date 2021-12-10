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
  collectedAmount: {
    type: DataTypes.STRING(30),
    allowNull: true
  },
  toBeDueAmount: {
    type: DataTypes.DECIMAL(8,2),
    allowNull: false
  },
  overdueAmount: {
    type: DataTypes.DECIMAL(20,3),
    defaultValue: 0,
    allowNull: false
  }

}, {sequelize: db, modelName: 'amounts'});

module.exports = Amounts;