const Seller = require('../../seller/domain/');
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

          Seller.single({where: {id: body.idSeller}})
          .then(res=>{

            console.log(res);
            let idSeller = body.idSeller
            let commissionUSD;
            let commissionBS;
  
  
            if (body.paymentUSD == 0){
              let commissionBS = parseFloat(res.commissionBS) - parseFloat(body.amount) 
  
              let update = Seller.up (  {commissionBS}    , {where:{id: idSeller}})
            } else{
              let commissionUSD = parseFloat(res.commissionUSD) - parseFloat(body.amount) 
  
              let update = Seller.up (  {commissionUSD}    , {where:{id: idSeller}})
            }

          } )
  
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
