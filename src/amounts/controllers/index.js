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

    res.send(dataBIll)

    // var hoy = new Date();
    // var devolucion = new Date();
    // devolucion.setDate(hoy.getDate() + 3);

    // console.log("Fecha actual: ", hoy.toLocaleDateString());
    // console.log("Fecha devolucion: ", devolucion.toLocaleDateString());

    dataBIll.map(data =>{
      if (data.id){
        let fecha = `${data.createdAt.getDate()}/${data.createdAt.getMonth()+1}/${data.createdAt.getYear()}`
        let hola = data.billDate;
        console.log(`${fecha} `);
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
