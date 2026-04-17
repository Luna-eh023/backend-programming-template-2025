const express = require('express');
const controller = require('./prize-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/prize', route);

  route.get('/', controller.getAll);
  route.get('/winners', controller.winners);
};
