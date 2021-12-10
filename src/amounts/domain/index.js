const Amounts = require('./model');


function single(attr) {
  return Amounts.findOne(attr)
}

function all(attr) {
  return Amounts.findAll(attr)
}

function create(attr){
  return Amounts.create(attr)
}


module.exports = {
  single,
  all,
  create
}
