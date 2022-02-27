const Payment = require('../domain');
const Bill = require('../../bill/domain/model');
const BillFunctions = require('../../bill/domain/index');
const AmountsFunctions = require('../../amounts/domain/index');
const SellerF = require('../../seller/domain/index');

async function getAll(req, res) {
  try {
    const data = await Payment.all();
    res.send(data)
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}

async function getPaymentsByDay(req, res) {
  try {

    const day = req.query.day;

    Payment.all({
      attributes: ['id', 'amountUSD', 'referenceNumber', 'exchangeRate', 'bank', 'date', 'paymentUSD', 'idBill'],
      include: [{ model: Bill, attributes: ['client', 'rif'] }],
      where: { date: day },
      order: [
        ['id', 'DESC'],
      ]
    }).then(resp => {

      if (resp.length == 0) {
        return res.send({
          ok: false,
          pagos: [],
          sumaUSD: '0 USD',
          sumaBS: '0 Bs',
        });

      } else {

        let sumBS = 0;
        let sumUSD = 0;
        let total = 0;

        resp.map(datos => {

          if (datos.paymentUSD == true) {
            sumUSD = sumUSD + parseFloat(datos.amountUSD);

          } else {
            sumBS = sumBS + (datos.amountUSD * datos.exchangeRate);

          }

          total = total + parseFloat(datos.amountUSD);

        });

        return res.send({
          ok: true,
          pagos: resp,
          sumaUSD: `${sumUSD}`,
          sumaBS: `${sumBS}`,
          total: `${total}`
        })

      }

    }).catch(e => {

      res.status(400).send({ error: e.message })

    });


  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}

async function getPaymentsByMonth(req, res) {
  try {

    const month = req.query.month;

    Payment.all({
      attributes: ['id', 'amountUSD', 'referenceNumber', 'exchangeRate', 'bank', 'date', 'paymentUSD', 'idBill'],
      include: [{ model: Bill, attributes: ['client', 'rif'] }],
      order: [
        ['id', 'DESC'],
      ]
    }).then(resp => {

      if (resp.length == 0) {
        return res.send({
          ok: false,
          pagos: [],
          sumaUSD: '0 USD',
          sumaBS: '0 Bs',
        });

      } else {

        let sumBS = 0;
        let sumUSD = 0;
        let total = 0;
        pagos = [];

        resp.map(datos => {

          if ((datos.date).substring(0, 7) == month) {

            pagos.push(datos);

            if (datos.paymentUSD == true) {
              sumUSD = sumUSD + parseFloat(datos.amountUSD);

            } else {
              sumBS = sumBS + (datos.amountUSD * datos.exchangeRate);

            }

            total = total + parseFloat(datos.amountUSD);

          }

        });

        return res.send({
          ok: true,
          pagos,
          sumaUSD: `${sumUSD}`,
          sumaBS: `${sumBS}`,
          total: `${total}`
        })

      }

    }).catch(e => {

      res.status(400).send({ error: e.message })

    });


  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}


async function getOne(req, res) {
  try {
    const id = req.params.id;
    const data = await Payment.single({
      where: { id }
    });
    res.send(data)
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}

async function create(req, res) {

  try {
    const body = req.body;

    console.log(body.overPaidBS);

    BillFunctions.single({
      attributes: ['id', 'amountUSD', 'idSeller', 'sellersComission'],
      where: { id: body.id }
    })
      .then(data => {

        if (!data) {
          return res.send({
            ok: false,
            message: 'No existe la factura, verifique el numero e intente nuevamente'
          });

        } else {

          body.id = null;

          if (parseFloat(body.amountUSD) <= 0) {

            return res.send({
              ok: false,
              message: 'El monto a pagar es invalido'
            });

          } else if (parseFloat(body.amountUSD) < parseFloat(data.amountUSD)) {

            AmountsFunctions.all({
              attributes: ['id', 'paid', 'unPaid', 'notPayed'],
              where: { idBill: data.id }
            })
              .then(data2 => {

                let pagado = parseFloat(data2[0].paid) + parseFloat(body.amountUSD);
                let noPagado = parseFloat(data2[0].unPaid) - parseFloat(body.amountUSD);
                let nuevoSaldo = parseFloat(data.amountUSD) - parseFloat(body.amountUSD);
                body.idBill = data.id;

                SellerF.single({
                  where: { id: data.idSeller }
                }).then(sellerData => {


                  if (body.paymentUSD == false) {
                    let comisionAux = (body.amountUSD * (data.sellersComission / 100));
                    let comision = parseFloat(comisionAux) + parseFloat(sellerData.commissionUSD);
                    SellerF.up({ commissionUSD: comision }, { where: { id: data.idSeller } });
                  } else {


                    let comisionAux = ((body.amountUSD * body.exchangeRate) * (data.sellersComission / 100));
                    let comision = parseFloat(comisionAux) + parseFloat(sellerData.commissionBS);
                    SellerF.up({ comisionBs: comision }, { where: { id: data.idSeller } });


                  }

                })


                Promise.all([
                  BillFunctions.up({amountUSD: nuevoSaldo}, {where: {id: data.id}}),
                  AmountsFunctions.up({ paid: pagado, unPaid: noPagado }, { where: { idBill: data.id } }),
                  Payment.create(body)
                ])
                  .then(resp => {
                    res.send(resp);

                  })
                  .catch(e => {
                    res.status(400).send({ error4: e.message });
                    console.log(e);

                  })

              })
              .catch(err => {
                res.status(400).send({ error3: err.message });
                console.log(err);

              })

          } else if (parseFloat(body.amountUSD) >= parseFloat(data.amountUSD)) {

            AmountsFunctions.all({
              attributes: ['id', 'paid', 'unPaid', 'notPayed'],
              where: { idBill: data.id }

            })
              .then(data2 => {

                let pagado = parseFloat(data2[0].paid) + parseFloat(body.amountUSD);
                let nuevoSaldo = parseFloat(data.amountUSD) - parseFloat(body.amountUSD);
                let noPagado = parseFloat(data2[0].unPaid) - parseFloat(body.amountUSD);
                body.idBill = data.id;

                SellerF.single({
                  where: { id: data.idSeller }
                }).then(sellerData => {


                  if (body.paymentUSD == false) {

                    let comisionAux = (body.amountUSD * (data.sellersComission / 100));
                    let comision = parseFloat(comisionAux) + parseFloat(sellerData.commissionUSD);
                    SellerF.up({ commissionUSD: comision }, { where: { id: data.idSeller } });

                  } else {

                    let comisionAux = ((body.amountUSD * body.exchangeRate) * (data.sellersComission / 100));
                    let comision = parseFloat(comisionAux) + parseFloat(sellerData.commissionBS);
                    SellerF.up({ comisionBs: comision }, { where: { id: data.idSeller } });
                  }

                  Promise.all([
                    AmountsFunctions.up({ paid: pagado, unPaid: noPagado }, { where: { idBill: data.id } }),
                    BillFunctions.up({ overPaidBS: body.overPaidBS }, { where: { id: data.id } }),
                    Payment.create(body)
                  ])
                    .then(resp => {
                      res.send(resp);

                    })
                    .catch(e => {
                      res.status(400).send({ error4: e.message });

                    })


                })

              })
              .catch(err => {
                res.status(400).send({ error3: err.message });

              })

          }
        }

      }).catch(e => {
        res.status(400).send({ error2: e.message });
      });

  } catch (e) {
    res.status(400).send({ error1: e.message })
  }
}

async function getPaymentsByBill(req, res) {
  try {

    const bill = req.query.bill;

    Payment.all({
      attributes: ['id', 'amountUSD', 'referenceNumber', 'exchangeRate', 'bank', 'date', 'paymentUSD', 'idBill'],
      include: [{ model: Bill, attributes: ['client', 'rif'] }],
      where: [{ idBill: bill }]
    }).then(resp => {

      if (resp.length == 0) {
        return res.send({
          ok: false,
          pagos: [],
        });

      } else {

        return res.send({
          ok: true,
          pagos: resp
        })

      }

    }).catch(e => {

      res.status(400).send({ error: e.message })

    });


  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}



module.exports = {
  getAll,
  getOne,
  create,
  getPaymentsByDay,
  getPaymentsByMonth,
  getPaymentsByBill
}
