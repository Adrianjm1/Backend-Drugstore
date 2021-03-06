const Amounts = require('../../amounts/domain/model');
const BillFunctions = require('../../bill/domain/index');
const AmountsFunctions = require('../../amounts/domain/index');
const Seller = require('../domain');
const { Op } = require("sequelize");

async function getAll(req, res){
  try {
    const data = await Seller.all({ include: [{ model: Amounts }],});
    res.send(data)
  } catch (e) {
    res.status(400).send({error: e.message})
  }
}

async function getNotPayed(req, res){
  try {
    const data = await Seller.all({ include: [{ model: Amounts,where: { notPayed:{ [Op.gt]: 0  } } }],                });
    res.send(data)
  } catch (e) {
    res.status(400).send({error: e.message})
  }
}



async function getOne(req, res){
  try {
    const  id  = req.params.id;
    const data = await Seller.single({
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
    const data = await Seller.create(body);
    res.send(data)
  } catch (e) {
    res.status(400).send({error: e.message})
  }
}

async function deleteSeller(req, res) {
  try {

    const id = req.params.id;

    const eliminado = await Seller.single({ where: { id } });

    Promise.all([
      AmountsFunctions.deleteA({ where: { idSeller: id } }),
      BillFunctions.deleteB({ where: { idSeller: id } }),
      Seller.deleteS({ where: { id } })
    ])

    res.send({
      ok: true,
      res: `${eliminado.name} ha sido eliminado`
    });


  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}



module.exports = {
  getAll,
  getOne,
  make,
  getNotPayed,
  deleteSeller
}
