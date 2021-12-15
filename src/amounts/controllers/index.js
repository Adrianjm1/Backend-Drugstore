const Amounts = require('../domain');
const BillF = require('../../bill/domain');

async function getAll(req, res){
  try {
    const data = await Amounts.all();
    res.send(data)
  } catch (e) {
    res.status(400).send({error: e.message})
  }
}



async function getOne(req, res){
  try {
    const  id  = req.params.id;
    const data = await Amounts.single({
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
    const data = await Amounts.create(body);
    res.send(data)
  } catch (e) {
    res.status(400).send({error: e.message})
  }
}


async function updateToDate(req, res){
  try {
    const data = await Amounts.all();
    res.send(data)
  } catch (e) {
    res.status(400).send({error: e.message})
  }
}



async function updateToDate(req, res){
  try {

     const dataBIll = await BillF.all();
    let today = new Date();
    // res.send(dataBIll)


    dataBIll.map(data =>{
      if (data.id){
        //  let fechaF = `${data.createdAt.getDate()}/${data.createdAt.getMonth()+1}/${data.createdAt.getFullYear()}`;
         let fecha = data.billDate ;
         console.log(fecha);
         fecha.setDate(fecha.getDate() + data.creditDays);

         if (fecha.toLocaleDateString() > today.toLocaleDateString()){
           console.log(`factura ${data.id} fuera de fecha se compararon ${fecha.toLocaleDateString()} y ${today.toLocaleDateString()}`);
         } else{
          console.log(`factura ${data.id} en fecha se compararon ${fecha.toLocaleDateString()} y ${today.toLocaleDateString()}`);
         }

      





        // res.send( fecha.toLocaleDateString())
      }
    })


  } catch (e) {
    res.status(400).send({error: e.message})
  }
}



module.exports = {
  getAll,
  getOne,
  make,
  updateToDate
}
