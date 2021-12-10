const User = require('../domain');
const md5 = require('md5');
const jwt = require('jsonwebtoken');



async function login(req, res){

  try {
    const { username, password } = await Username.validateAsync(req.body);

    const passwordHash = md5(password);
    const data = await User.single({
      where: {username}
    });
    
    if(!data){
      return res.send({
        ok: false,
        resp: 'Usuario o contraseña incorrectos'    //Se colocan los parentesis de muestra, pero se deben quitar
      })
    }

    if(passwordHash !== data.password){
      return res.send({
        ok: false,
        resp: 'Usuario o contraseña incorrectos'      //Se colocan los parentesis de muestra, pero se deben quitar
      })
    }

    data.password = null;

    let token = jwt.sign({
      usuario: data
    }, 'token-SEED', { expiresIn: '5h' });


    res.send({
      ok: true,
      usuario: data,
      token
    });

  } catch (e) {
    res.status(400).send({error: e.message})
  }

}


 async function getAll(req, res){
  try {
    const data = await User.all();
    res.send(data)
  } catch (e) {
    res.status(400).send({error: e.message})
  }
}

async function getOne(req, res){
  try {
    const { id } = await Id.validateAsync(req.params);
    const data = await User.single({
      where: {id: id}
    });
    res.send(data)
  } catch (e) {
    res.status(400).send({error: e.message})
  }
}

module.exports = {

  login,
  getOne,
  getAll

}
