const Router = require('express').Router();
const Controller = require('./index.js');

// Rutas...

Router.post('/login', Controller.login);
Router.get('/', Controller.getAll);
Router.get('/:id', Controller.getOne); 



module.exports = Router