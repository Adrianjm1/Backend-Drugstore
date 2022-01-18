const SellerPayment = require('./model');


function single(attr) {
  return SellerPayment.findOne(attr)
}

function all(attr) {
  return SellerPayment.findAll(attr)
}

function create(attr){
  return SellerPayment.create(attr)
}

function up(attr,where) {
  return SellerPayment.update(attr,where)
}

module.exports = {
  single,
  all,
  create,
  up
}
