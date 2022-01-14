const Router = require('express').Router();
// const {validToken} = require('../../user/controllers/middleware');
const Controller = require('./index.js');

Router.get('/', Controller.getAll);


Router.post('/create', Controller.create);
Router.get('/:id', Controller.getPayBySeller);


module.exports = Router

