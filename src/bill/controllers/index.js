const Bill = require('../domain');
const Seller = require('../../seller/domain/model');
const AmountF = require('../../amounts/domain');
const Amounts = require('../../amounts/domain/model');
const { Op } = require("sequelize");
var bodyParser = require('body-parser');
var path = require('path');     //used for file path
var fs = require('fs');       //File System - for file manipulation
const multer = require('multer');



// const { Fac } = require('../validations');



async function getAll(req, res) {
  try {
    const data = await Bill.all({
      include: [{ model: Amounts }],

    });
    res.send(data)
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}




async function File(req, res) {
  try {

    var originalFilename = req.file.path;
    console.log(originalFilename); 


  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}



async function getBillBySeller(req, res) {
  try {
    const idSeller = req.params.id;
    const data = await Bill.all({
      where: { idSeller },
      

    });
    res.send(data)
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}



async function getOne(req, res) {
  try {
    const id = req.params.id;
    const data = await Bill.single({
      include: [{ model: Seller, attributes: ['name', 'lastname'] }, { model: Amounts }],
      where: { id }
    });
    res.send(data)
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}





async function createBill(req, res) {
  try {
    const body = req.body;

    let amountBS = body.exchange * body.amountUSD

    body.amountBS = amountBS


    Bill.create(body)
      .then(data => {

        const amount = {
          unPaid: body.amountUSD,
          idSeller: body.idSeller,
          idBill: data.id,
        }

        AmountF.create(amount)
          .then(amounts => {

            res.send({
              ok: true,
              bill: data,
              amounts
            });

          }).catch(e => {
            res.status(400).send({ eamounts: e.message });
          });

      }).catch(e => {
        res.status(400).send({ ebill: e.message });
      });

  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}


async function correcting(req, res) {
  try {

    let count =0;
    const data = await Bill.all({});

    const amountData = await AmountF.all({});

    data.map(data => {
      count =0;

      amountData.map(datos => {
          if  (datos.idBill == data.id){
              count++;
          }
      })

      if (count == 0){

        let amount = {
          unPaid: data.amountUSD,
          idSeller: data.idSeller,
          idBill: data.id,
        }
  
        AmountF.create(amount)
          .then(amounts => {
  
  
  
          }).catch(e => {
            res.status(400).send({ eamounts: e.message });
          });
      }

    });

    res.send({ data: data.length })


  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}


async function deleteBill(req, res) {
  try {
    const id = req.params.id
    const data = await Bill.deleteB({ where: { id } });
    res.send(`${data}  Factura borrada con exito`)
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}

async function getUnPaid(req, res) {
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
    res.status(400).send({ error: e.message })
  }
}


async function getPaid(req, res) {
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

    let sumUSD = 0;
    let sumBS = 0;

    data.map(data => {
      sumUSD = sumUSD + parseFloat(data.amountUSD);
      sumBS = sumBS + (parseFloat(data.amountUSD) * parseFloat(data.exchange))
    });

    res.send({
      data,
      sumUSD,
      sumBS
    });



  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}


async function getNotPayed(req, res) {
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
    res.status(400).send({ error: e.message })
  }
}



module.exports = {
  getAll,
  getOne,
  createBill,
  deleteBill,
  getUnPaid,
  getNotPayed,
  getPaid,
  getBillBySeller,
  correcting,
  File

}
