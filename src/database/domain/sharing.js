const Bill = require('../../bill/domain/model');
const Payments = require('../../payments/domain/model');
const Amounts = require('../../amounts/domain/model');
const Seller = require('../../seller/domain/model');
const User = require('../../user/domain/model');
const SellerPayment = require('../../sellerPayments/domain/model');


// Bill - Payments: One to Many
Bill.hasMany(Payments, {foreignKey: 'idBill'});
Payments.belongsTo(Bill, {foreignKey: 'idBill'});

// Seller - Bill: One to Many
Seller.hasMany(Bill, {foreignKey: 'idSeller'});
Bill.belongsTo(Seller, {foreignKey: 'idSeller'});

// Seller - Amounts: One to Many
Seller.hasMany(Amounts, {foreignKey: 'idSeller'});
Amounts.belongsTo(Seller,  {foreignKey: 'idSeller'});

// Bill - Amounts: One to One
Bill.hasOne(Amounts, {foreignKey: 'idBill'});
Amounts.belongsTo(Bill,  {foreignKey: 'idBill'});

//   Seller - SellerPayment: One to many
Seller.hasOne(SellerPayment, {foreignKey: 'idSeller'});
SellerPayment.belongsTo(Seller,  {foreignKey: 'idSeller'});
