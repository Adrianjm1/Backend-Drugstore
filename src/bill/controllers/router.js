const Router = require('express').Router();
const Controller = require('./index.js');
const {validToken} = require('../../user/controllers/middleware');
// Rutas...


Router.get('/', validToken, Controller.getAll);
Router.get('/:id', validToken, Controller.getOne); 
Router.get('/make', validToken, Controller.make);
Router.post('/create', validToken, Controller.createBill);
Router.delete('/delete/:id', validToken, Controller.deleteBill);


module.exports = Router