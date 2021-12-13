const Bill = require('../domain');
// const { Fac } = require('../validations');

async function getAll(req, res){
  try {
    const data = await Bill.all();
    res.send(data)
  } catch (e) {
    res.status(400).send({error: e.message})
  }
}



async function getOne(req, res){
  try {
    const  id  = req.params.id;
    const data = await Bill.single({
      where: {id}
    });
    res.send(data)
  } catch (e) {
    res.status(400).send({error: e.message})
  }
}

async function make(req, res) {
  // try {

  //   const body = await Bill.validateAsync(req.body);

  //   const data = await LocalFunctions.single({
  //     attributes: ['id', 'balance'],
  //     where: { code: body.code }
  //   });

  //   if (!data) {
  //     return res.send({
  //       ok: false,
  //       message: 'El codigo ingresado no existe'
  //     })
  //   }

  //   data.balance = parseFloat(data.balance) - parseFloat(body.amountUSD) - parseFloat(body.nota);

  //   body.idLocal = data.id;
  //   body.idAdmin = req.usuario.id;
  //   body.restanteUSD = data.balance;

  //   const save = await Payments.create(body);
  //   const balanceUpdated = await LocalFunctions.updateTab({ balance: data.balance }, { where: { id: data.id } });

  //   res.send({ save, balanceUpdated });


  // } catch (e) {
  //   res.status(400).send({ error: e.message })
  // }
}




async function createBill(req, res) {
  try {
    const body = req.body;
    const data = await Bill.create(body);
    res.send(data)
  } catch (e) {
    res.status(400).send({error: e.message})
  }
}
  



module.exports = {
  getAll,
  getOne,
  make,
  createBill
}
