const Seller = require('./model');


function single(attr) {
  return Seller.findOne(attr)
}

function all(attr) {
  return Seller.findAll(attr)
}

function create(attr){
  return Seller.create(attr)
}


module.exports = {
  single,
  all,
  create
}
