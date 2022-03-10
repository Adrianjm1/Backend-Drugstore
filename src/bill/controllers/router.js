const Router = require('express').Router();
const Controller = require('./index.js');
const Bill = require('../domain');
const { validToken } = require('../../user/controllers/middleware');
const multer = require('multer');

const readXlsxFile = require('read-excel-file/node')
// import readXlsxFile from 'read-excel-file';
// const upload = multer()


// Rutas...


// File path.



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/bill/controllers/files")
  },
  filename: (req, file, cb) => {
    let day = new Date;
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })



Router.post('/file', upload.single('file'), (req, res) => {

  filePath = './src/bill/controllers/files/tabla.xlsx'

  let blacklist = [];
  readXlsxFile(filePath).then((rows) => {

    rows.shift();
    const verdadero = Bill.all().then(data => {
      data.map(datos => {

        rows.map(row => {
          let count = 0;
          let body = {};

          body.id = row[0];

          if (datos.id == body.id) {
            count++
            console.log('hay data duplicada ' + datos.id + ' ' + body.id);
            blacklist.push(datos.id);
            return;
          }

        })

      })

      rows.map(row => {

        let body = {};

        body.id = row[0];
        body.billDate = row[1];
        body.dispatchDate = row[2];
        body.expirationDate = row[3];
        body.client = row[4];
        body.rif = row[5];
        body.amountUSD = row[6];
        body.amountBS = row[7];
        body.exchange = row[8];
        body.location = row[9];
        body.city = row[10];
        body.sellersComission = row[11];
        body.createdAt = row[12];
        body.updatedAt = row[13];
        body.idSeller = row[14];


        if (body.city == '' || body.city == null) {
          body.city = '-'
        }
        if (body.location == '' || body.location == null) {
          body.location = '-'
        }
        if (body.rif == '' || body.rif == null) {
          body.rif = '-'
        }

        if (blacklist.includes(body.id)) {
          console.log(` factura ${body.id} duplicada`);
        }
        else {

          Bill.create(body)
        }
      })
    });
  })


  res.send("Enviada");


})



Router.get('/correct', Controller.correcting);


Router.get('/unpaid', Controller.getUnPaid);
Router.get('/notpayed', validToken, Controller.getNotPayed);
Router.get('/paid', Controller.getPaid);
Router.get('/seller/:id', validToken, Controller.getBillBySeller);
Router.get('/:id', validToken, Controller.getOne);
Router.post('/create', validToken, Controller.createBill);
Router.delete('/delete/:id', validToken, validToken, Controller.deleteBill);
Router.get('/', validToken, Controller.getAll);



module.exports = Router