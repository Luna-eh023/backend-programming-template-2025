const { Gacha, Prize } = require('../../../models');

async function getTodayCount(userId) {
  const start = new Date();
  start.setHours(0,0,0,0);

  return Gacha.countDocuments({
    userId,
    createdAt: { $gte: start }
  });
}

async function getAvailablePrize() {
  return Prize.find({
    $expr: { $lt: ['$winnerCount', '$quota'] }
  });
}

async function saveResult(data) {
  return Gacha.create(data);
}

async function addWinner(id) {
  return Prize.updateOne(
    { _id: id },
    { $inc: { winnerCount: 1 } }
  );
}

async function getHistory(userId) {
  return Gacha.find({ userId });
}

module.exports = {
  getTodayCount,
  getAvailablePrize,
  saveResult,
  addWinner,
  getHistory
};