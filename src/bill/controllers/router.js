const Router = require('express').Router();
const Controller = require('./index.js');
const { validToken } = require('../../user/controllers/middleware');
// Rutas...

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