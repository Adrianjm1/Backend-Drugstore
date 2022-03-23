const Amounts = require('./model');


function single(attr) {
  return Amounts.findOne(attr)
}

function all(attr) {
  return Amounts.findAll(attr)
}

function up(attr,where) {
  return Amounts.update(attr,where)
}

function create(attr){
  return Amounts.create(attr)
}

function deleteA(attr){
  return Amounts.destroy(attr)
}



module.exports = {
  single,
  all,
  create,
  up,
  deleteA
}
