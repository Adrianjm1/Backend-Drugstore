const Router = require('express').Router();
const Controller = require('./index.js');

// Rutas...

Router.get('/', Controller.getAll);
Router.get('/notPayed', Controller.getNotPayed);
Router.get('/:id', Controller.getOne); 
Router.get('/make', Controller.make);

module.exports = Router