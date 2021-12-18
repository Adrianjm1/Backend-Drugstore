const Router = require('express').Router();
const Controller = require('./index.js');

// Rutas...


Router.get('/', Controller.getAll);
Router.get('/verify', Controller.updateToDate);
Router.get('/bill/:idBill', Controller.getAmount); 
Router.get('/:id', Controller.getOne); 
Router.get('/make', Controller.make);


module.exports = Router