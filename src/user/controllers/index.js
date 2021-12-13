const User = require('../domain');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const {Username, New} = require('../validations/index');


async function login(req, res){

  try {
    const { username, password } = await Username.validateAsync(req.body);

    const passwordHash = md5(password);

    User.single({
      where: {username}
    }).then(data => {

      if(!data){
        return res.send({
          ok: false,
          resp: '(Usuario) o contraseña incorrectos'    //Se colocan los parentesis de muestra, pero se deben quitar
        })
      }

      console.log(data);

      if(passwordHash !== data.password){
        return res.send({
          ok: false,
          resp: 'Usuario o (contraseña) incorrectos'      //Se colocan los parentesis de muestra, pero se deben quitar
        })
      }

      let token = jwt.sign({
        usuario: data
      }, 'token-SEED', { expiresIn: '5h' });

      data.password = null;

      res.send({
        ok: true,
        usuario: data,
        token
      });


    }).catch(err =>{
      return res.send({
        ok: false,
        resp: 'Se ha producido un error, por favor vuelve a intentarlo',
        err
      });
    });

  } catch (e) {
    res.status(400).send({error: e.message})
  }

}

async function signup(req, res){

  try {
    const body = await New.validateAsync(req.body);

    body.password = md5(body.password);

    User.create(body).then(data => {

      res.send({
        ok: true,
        usuario: data,
      });

    }).catch(err =>{
      return res.send({
        ok: false,
        resp: 'Se ha producido un error, por favor vuelve a intentarlo',
        err
      });
    });

  } catch (e) {
    res.status(400).send({error: e.message})
  }

}


module.exports = {
  login,
  signup
}
