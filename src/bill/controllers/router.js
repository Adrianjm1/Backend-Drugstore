const Router = require('express').Router();
const Controller = require('./index.js');

// Rutas...


Router.get('/', Controller.getAll);
Router.get('/:id', Controller.getOne); 
Router.get('/make', Controller.make);
Router.post('/create', Controller.createBill);
Router.delete('/delete/:id', Controller.deleteBill);


module.exports = Router