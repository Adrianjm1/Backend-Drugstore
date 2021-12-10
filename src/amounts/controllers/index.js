const Amounts = require('../domain');

async function getAll(req, res){
  try {
    const data = await Amounts.all();
    res.send(data)
  } catch (e) {
    res.status(400).send({error: e.message})
  }
}



async function getOne(req, res){
  try {
    const  id  = req.params.id;
    const data = await Amounts.single({
      where: {id}
    });
    res.send(data)
  } catch (e) {
    res.status(400).send({error: e.message})
  }
}

async function make(req, res){
  try {
    const body = req.body;
    const data = await Amounts.create(body);
    res.send(data)
  } catch (e) {
    res.status(400).send({error: e.message})
  }
}



module.exports = {
  getAll,
  getOne,
  make
}
