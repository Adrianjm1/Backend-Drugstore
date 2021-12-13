
const Bill = require('./model');


function single(attr) {
  return Bill.findOne(attr)
}

function all(attr) {
  return Bill.findAll(attr)
}

function create(attr){
  return Bill.create(attr)
}

function deleteB(attr){
  return Bill.destroy(attr)
}


module.exports = {
  single,
  all,
  create,
  deleteB
}
