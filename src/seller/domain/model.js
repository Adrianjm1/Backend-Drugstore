const { DataTypes, Model } = require('sequelize');
const db = require('../../database/domain');

class Seller extends Model {}
Seller.init({
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
  commissionUSD:{
    type: DataTypes.DECIMAL(20,3),
    defaultValue: 0,

  },
  commissionBS:{
    type: DataTypes.DECIMAL(20,3),
    defaultValue: 0,
  }

}, {sequelize: db, modelName: 'seller'});

module.exports = Seller;