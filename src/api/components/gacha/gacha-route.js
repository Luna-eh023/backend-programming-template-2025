const express = require('express');
const controller = require('./gacha-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/gacha', route);

  route.post('/', controller.play);
  route.get('/history/:userId', controller.history);
  route.get('/prizes', controller.prizes);
  route.get('/winners', controller.winners);
};
