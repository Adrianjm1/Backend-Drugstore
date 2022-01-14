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


module.exports = {
  single,
  all,
  create
}
