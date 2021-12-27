const Router = require('express').Router();
const Controller = require('./index.js');
const {validToken} = require('../../user/controllers/middleware');
// Rutas...


Router.get('/unpaid', Controller.getUnPaid); 
Router.get('/notpayed', Controller.getNotPayed); 
Router.get('/paid', Controller.getPaid); 
Router.get('/:id', Controller.getOne); 
Router.post('/create', validToken, Controller.createBill);
Router.delete('/delete/:id', validToken, Controller.deleteBill);
Router.get('/',  Controller.getAll);


module.exports = Router