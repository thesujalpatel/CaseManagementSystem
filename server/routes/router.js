const express = require('express');
const route = express.Router();

const services = require('../services/render');
const controller = require('../controller/controller');

route.get('/',services.homeRoutes);
route.get('/appointments',services.appointments);

route.post('/api/users',controller.create);
module.exports = route;