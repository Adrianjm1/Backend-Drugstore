const Payment = require('../domain');
const Bill = require('../../bill/domain/model');

async function getAll(req, res){
  try {
    const data = await Payment.all();
    res.send(data)
  } catch (e) {
    res.status(400).send({error: e.message})
  }
}

async function getPaymentsByDay(req, res){
  try {
  
    const day = req.query.day;

    Payment.all({
      attributes: ['id', 'amountUSD', 'referenceNumber', 'exchangeRate', 'bank', 'date', 'paymentUSD', 'idBill'],
      include: [ { model: Bill, attributes: ['client','rif'] }],
      where: {date: day},
      order: [
        ['id', 'DESC'],
      ]
    }).then(resp => {

      if(resp.length == 0){
        return res.send({
          ok: false,
          pagos: [],
          sumaUSD: '0 USD',
          sumaBS: '0 Bs',
        });

      } else{

        let sumBS = 0;
        let sumUSD = 0;

        resp.map(datos => {

          if(datos.paymentUSD == true){
            sumUSD = sumUSD + parseFloat(datos.amountUSD);

          } else{
            sumBS = sumBS + (datos.amountUSD * datos.exchangeRate);

          }

        });

        return res.send({
          ok: true,
          pagos: resp,
          sumaUSD: `${sumUSD} USD`,
          sumaBS: `${sumBS} Bs`
        })

      }

    }).catch(e => {

      res.status(400).send({error: e.message})

    });


  } catch (e) {
    res.status(400).send({error: e.message})
  }
}

async function getPaymentsByMonth(req, res){
  try {
  
    const month = req.query.month;

    Payment.all({
      attributes: ['id', 'amountUSD', 'referenceNumber', 'exchangeRate', 'bank', 'date', 'paymentUSD', 'idBill'],
      include: [ { model: Bill, attributes: ['client','rif'] }],
      order: [
        ['id', 'DESC'],
      ]
    }).then(resp => {

      if(resp.length == 0){
        return res.send({
          ok: false,
          pagos: [],
          sumaUSD: '0 USD',
          sumaBS: '0 Bs',
        });

      } else{

        let sumBS = 0;
        let sumUSD = 0;
        pagos = [];

        resp.map(datos => {

          if((datos.date).substring(0,7) == month){

            pagos.push(datos);

            if(datos.paymentUSD == true){
              sumUSD = sumUSD + parseFloat(datos.amountUSD);
  
            } else{
              sumBS = sumBS + (datos.amountUSD * datos.exchangeRate);
  
            }

          }

        });

        return res.send({
          ok: true,
          pagos,
          sumaUSD: `${sumUSD} USD`,
          sumaBS: `${sumBS} Bs`
        })

      }

    }).catch(e => {

      res.status(400).send({error: e.message})

    });


  } catch (e) {
    res.status(400).send({error: e.message})
  }
}


async function getOne(req, res){
  try {
    const  id  = req.params.id;
    const data = await Payment.single({
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
    const data = await Payment.create(body);
    res.send(data)
  } catch (e) {
    res.status(400).send({error: e.message})
  }
}



module.exports = {
  getAll,
  getOne,
  make,
  getPaymentsByDay,
  getPaymentsByMonth
}
