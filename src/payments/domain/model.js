const { DataTypes, Model } = require('sequelize');
const db = require('../../database/domain');

class Payment extends Model {}
Payment.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  amountUSD: {
    type: DataTypes.DECIMAL(8,30),
    allowNull: false
  },
  exchangeRate: {
    type: DataTypes.DECIMAL(20,3),
    defaultValue: 0,
    allowNull: true
  },
  referenceNumber: {
    type: DataTypes.STRING(30),
    allowNull: true
  },
  date: {
    type: DataTypes.STRING(15),
    allowNull: false
  },
  bank: {
    type: DataTypes.STRING(30),
    defaultValue: '',
    allowNull: false
  },
  paymentUSD: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }

}, {sequelize: db, modelName: 'payment'});

module.exports = Payment;