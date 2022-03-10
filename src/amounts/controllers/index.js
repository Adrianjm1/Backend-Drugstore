const Amounts = require('../domain');
const BillF = require('../../bill/domain');
const { now } = require('sequelize/dist/lib/utils');

async function getAll(req, res) {
  try {
    const data = await Amounts.all();
    res.send(data)
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}




async function getOne(req, res) {
  try {
    const id = req.params.id;
    const data = await Amounts.single({
      where: { id }
    });
    res.send(data)
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}


async function getAmount(req, res) {
  try {
    const idBill = req.params.idBill;
    const data = await Amounts.single({
      where: { idBill }
    });
    res.send(data)
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}


async function make(req, res) {
  try {
    const body = req.body;
    const data = await Amounts.create(body);
    res.send(data)
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}



async function updateToDate(req, res) {
  try {

    const dataBIll = await BillF.all();
    let amountsData = await Amounts.all();
    let today = new Date();

    dataBIll.map(data => {

      if (data.id) {

        let expiration = new Date(data.expirationDate);

        if (today > expiration || today.getFullYear() > data.expirationDate.getFullYear()) {

          let idBill = data.id;

          amountsData.map(amountD => {

            if (amountD.idBill === data.id) {

              if (amountD.notPayed == 0) {
                let notPayed = amountD.unPaid;
                let unPaid = 0;
                Amounts.up({ notPayed, unPaid }, { where: { idBill } });

              }
            }

          })


        }

      }
    })


    res.send({ message: "dios" });

  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}



module.exports = {
  getAll,
  getOne,
  make,
  updateToDate,
  getAmount,
}
