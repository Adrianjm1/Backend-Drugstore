const Bill = require('../domain');
const Seller = require('../../seller/domain/model');
const AmountF = require('../../amounts/domain');
const Amounts = require('../../amounts/domain/model');
const { Op } = require("sequelize");
// const { Fac } = require('../validations');

async function getAll(req, res){
  try {
    const data = await Bill.all({
      include: [ { model: Amounts }],

    });
    res.send(data)
  } catch (e) {
    res.status(400).send({error: e.message})
  }
}



async function getOne(req, res){
  try {
    const  id  = req.params.id;
    const data = await Bill.single({
      include: [ { model: Seller, attributes: ['name','lastname'] }, {model: Amounts}],
      where: {id}
    });
    res.send(data)
  } catch (e) {
    res.status(400).send({error: e.message})
  }
}





async function createBill(req, res) {
  try {
    const body = req.body;


    let fecha =  new Date(`${body.billDate}`) ;

    fecha.setDate(fecha.getDate() + body.creditDays);
    body.expirationDate = fecha;

    Bill.create(body)
      .then(data => {

        const amount = {
          unPaid: body.amountUSD,
          idSeller: body.idSeller,
          idBill : data.id,
        }  
        
        AmountF.create(amount)
          .then(amounts => {

            res.send({
              ok: true,
              bill: data,
              amounts
            });

          }).catch(e => {
            res.status(400).send({eamounts: e.message});
          });

      }).catch(e => {
        res.status(400).send({ebill: e.message});
      });

  } catch (e) {
    res.status(400).send({error: e.message})
  }
}


async function deleteBill(req, res) {
  try {
    const id = req.params.id
    console.log(id);
     const data = await Bill.deleteB({ where: { id } });
    res.send(`${data}  Factura borrada con exito`)
  } catch (e) {
    res.status(400).send({error: e.message})
  }
}
  
async function getUnPaid(req, res){
  try {
    const data = await Bill.all({
      include: {
        model: Amounts,
        where: {
          unPaid: {
            [Op.gt]: 0
          },
          notPayed: {
            [Op.eq]: 0
          }
        }
      }
    });
    res.send(data)
  } catch (e) {
    res.status(400).send({error: e.message})
  }
}


async function getPaid(req, res){
  try {
    const data = await Bill.all({
      include: {
        model: Amounts,
        where: {
          paid: {
            [Op.gt]: 0
          },
          notPayed: {
            [Op.eq]: 0
          },
          unPaid: {
            [Op.eq]: 0
          },
        }
      }
    });
    res.send(data)
  } catch (e) {
    res.status(400).send({error: e.message})
  }
}


async function getNotPayed(req, res){
  try {
    const data = await Bill.all({
      include: {
        model: Amounts,
        where: {
          notPayed: {
            [Op.gt]: 0
          }
        }
      }
    });
    res.send(data)
  } catch (e) {
    res.status(400).send({error: e.message})
  }
}



module.exports = {
  getAll,
  getOne,
  createBill,
  deleteBill,
  getUnPaid,
  getNotPayed,
  getPaid
}
