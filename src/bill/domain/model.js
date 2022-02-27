const { DataTypes, Model } = require('sequelize');
const db = require('../../database/domain')

class Bill extends Model { }
Bill.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  billDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  dispatchDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  expirationDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  client: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  rif: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  amountUSD: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: false
  },
  amountBS: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: false
  },
  exchange: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: false
  },
  overPaidBS: {
    type: DataTypes.DECIMAL(20, 3),
    defaultValue: 0,
    allowNull: true
  },
  location: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  city: {
    type: DataTypes.STRING(15),
    allowNull: false
  },
  sellersComission: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: false
  },

}, { sequelize: db, modelName: 'bill' });

module.exports = Bill;