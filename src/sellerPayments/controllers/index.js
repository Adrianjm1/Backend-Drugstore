const Payment = require('../domain');
const SellerPayment = require('../domain');

async function getAll(req, res){
  try {
    const data = await SellerPayment.all();
    res.send(data)
  } catch (e) {
    res.status(400).send({error: e.message})
  }
}

async function getPayBySeller(req, res){
  try {
    const idSeller = req.params.id;
    const data = await SellerPayment.all({where:{idSeller}});
    res.send(data)
  } catch (e) {
    res.status(400).send({error: e.message})
  }
}



async function create(req, res){

    try {
      const body = req.body;
  
  
  
      SellerPayment.create(body)
        .then(data => {
  
          res.send({data})
  
        }).catch(e => {
          res.status(400).send({ebill: e.message});
        });
  
    } catch (e) {
      res.status(400).send({error: e.message})
    }
}



module.exports = {
  getAll,
  getPayBySeller,
  create,
}
