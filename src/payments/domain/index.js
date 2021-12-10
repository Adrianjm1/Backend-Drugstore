const Payment = require('./model');


function single(attr) {
  return Payment.findOne(attr)
}

function all(attr) {
  return Payment.findAll(attr)
}

function create(attr){
  return Payment.create(attr)
}


module.exports = {
  single,
  all,
  create
}
