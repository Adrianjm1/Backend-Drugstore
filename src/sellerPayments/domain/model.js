const { DataTypes, Model } = require('sequelize');
const db = require('../../database/domain');

class SellerPayment extends Model {}
SellerPayment.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL(8,2),
    allowNull: false
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

}, {sequelize: db, modelName: 'SellerPayment'});

module.exports = SellerPayment;