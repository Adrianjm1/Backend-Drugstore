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
    destination:  (req, file, cb)=> {
      cb(null, "./src/bill/controllers/files")
    },
    filename:  (req, file, cb)=> {
      let day =new Date;
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

Router.post('/file', upload.single('file'), (req, res) => {
    
    // console.log(req.file.originalname);

    filePath = './src/bill/controllers/files/tabla.xlsx'

    
    readXlsxFile(filePath).then((rows) => {
      // `rows` is an array of rows
      // each row being an array of cells.     

      /**
      [ [ 'Id', 'Name', 'Address', 'Age' ],
      [ 1, 'john Smith', 'London', 25 ],
      [ 2, 'Ahman Johnson', 'New York', 26 ]
      */
      // Remove Header ROW
      rows.shift();
      // console.log(rows);
      // console.log(rows.length);

      rows.map(row => {
        let body = {

        };
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
        console.log(body);
        Bill.create(body)
      })

  
      // Open the MySQL connection
    
      })
    // if (!files) {
    //   const error = new Error('Please choose files')
    //   error.httpStatusCode = 400
    //   return error
    // }
  
      res.send("Enviada")
   
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