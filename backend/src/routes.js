const express = require('express');
const ProdutorController = require('./controllers/ProdutorController');
const JobController = require('./controllers/JobController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/produtores', ProdutorController.index);
routes.post('/produtores', ProdutorController.create);

routes.get('/profile', ProfileController.index);

routes.get('/jobs', JobController.index);
routes.post('/jobs', JobController.create);
routes.delete('/jobs/:id', JobController.delete);

module.exports = routes;