const express = require('express');
const route = express.Router();

const services = require('../services/render');

const caseController = require('../controller/case');
const userController = require('../controller/user');
const configController = require('../controller/config');

route.get('/', services.homeRoutes);
route.get('/appointments', services.appointments);
route.get('/cases', services.cases);
route.get('/attorney', services.attorney);
route.get('/features', services.features);
route.get('/ftc', services.ftc);
route.get('/aw', services.aw);
route.get('/authentication', services.authentication);
route.get('/miscellaneous', services.miscellaneous);

route.get('/sign', services.sign);

route.get('/admin', services.admin);
route.get('/admin/createcase', services.createcase);
route.get('/admin/updatecase', services.updatecase);


// API
route.post('/api/cases', caseController.createcase);
route.get('/api/cases', caseController.findcase);
route.put('/api/cases/:id', caseController.updatecase);
route.delete('/api/cases/:id', caseController.deletecase);

route.post('/api/users', userController.createuser);
route.get('/api/users', userController.finduser);

route.get('/config', configController.config);

module.exports = route;