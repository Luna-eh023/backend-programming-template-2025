const { Prize, Gacha } = require('../../../models');

async function getAllPrize() {
  return Prize.find();
}

async function getWinnerData() {
  return Gacha.find({
    prize: { $ne: null },
  });
}

module.exports = {
  getAllPrize,
  getWinnerData,
};
