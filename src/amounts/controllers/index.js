const Amounts = require('../domain');
const BillF = require('../../bill/domain');

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


// async function updateToDate(req, res) {
//   try {
//     const data = await Amounts.all();
//     res.send(data)
//   } catch (e) {
//     res.status(400).send({ error: e.message })
//   }
// }



async function updateToDate(req, res) {
  try {

    const dataBIll = await BillF.all();
    let amountsData = await Amounts.all();
    let today = new Date();

    dataBIll.map(data => {
      if (data.id) {

        console.log(today.getFullYear() + ' y ' + (data.expirationDate).getFullYear());

        if (today.toLocaleDateString() > data.expirationDate.toLocaleDateString()  || today.getFullYear() > data.expirationDate.getFullYear()) {

    

          let idBill = data.id;

          amountsData.map(amountD => {

            if (amountD.idBill === data.id) {

              if (amountD.notPayed ==0 ) {
                let notPayed = amountD.unPaid;
                let unPaid = 0;
                let updated = Amounts.up({ notPayed, unPaid }, { where: { idBill } });

              }
            }

          })



          console.log("Se actualizo la info de la factura " + idBill);
        } else {
          console.log(`factura ${data.id} en fecha se compararon ${today.toLocaleDateString()} y ${data.expirationDate.toLocaleDateString()}`);
        }

        // res.send( fecha.toLocaleDateString())
      }
    })


    res.send({ message: "dios" })
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}



module.exports = {
  getAll,
  getOne,
  make,
  updateToDate,
  getAmount
}
