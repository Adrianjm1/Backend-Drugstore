 const User = require('./model');
 
function single(attr) {
  return User.findOne(attr)
}

function all(attr) {
  return User.findAll(attr)
}


module.exports = {
  single,
  all,

}
