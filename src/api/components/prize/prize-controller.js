const service = require('./prize-service');

async function getAll(req, res, next) {
  try {
    res.json(await service.getAll());
  } catch (err) {
    next(err);
  }
}

async function winners(req, res, next) {
  try {
    res.json(await service.winners());
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAll,
  winners,
};
