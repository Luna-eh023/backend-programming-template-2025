const repo = require('./prize-repository');

function maskName(name) {
  return name
    .split('')
    .map((char) => (Math.random() > 0.5 ? '*' : char))
    .join('');
}

async function getAll() {
  const data = await repo.getAllPrize();

  return data.map((item) => ({
    name: item.name,
    quota: item.quota,
    remaining: item.quota - item.winnerCount,
  }));
}

async function winners() {
  const data = await repo.getWinnerData();

  const result = {};

  data.forEach((item) => {
    if (!result[item.prize]) {
      result[item.prize] = [];
    }

    result[item.prize].push(maskName(item.userName));
  });

  return Object.keys(result).map((prize) => ({
    prize,
    winners: result[prize],
  }));
}

module.exports = {
  getAll,
  winners,
};
