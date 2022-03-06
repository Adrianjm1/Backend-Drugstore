const Router = require('express').Router();
const { validToken } = require('../../user/controllers/middleware.js');
const Controller = require('./index.js');

// Rutas...

Router.get('/', validToken, Controller.getAll);
Router.get('/notPayed', validToken, Controller.getNotPayed);
Router.get('/:id', validToken, Controller.getOne); 
Router.get('/make', validToken, Controller.make);
Router.post('/create', validToken, Controller.make);
Router.delete('/delete/:id',  Controller.deleteSeller);

module.exports = Router