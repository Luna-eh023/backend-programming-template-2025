const repo = require('./gacha-repository');

async function play(userId, userName) {
  const count = await repo.getTodayCount(userId);

  if (count >= 5) {
    throw new Error('Kuota gacha harian habis');
  }

  const prizes = await repo.getAvailablePrize();

  let result = null;

  if (Math.random() < 0.4 && prizes.length > 0) {
    result = prizes[Math.floor(Math.random() * prizes.length)];

    await repo.addWinner(result._id);
  }

  await repo.saveResult({
    userId,
    userName,
    prize: result ? result.name : null
  });

  return result ? result.name : 'Zonk';
}

async function history(userId) {
  return repo.getHistory(userId);
}

module.exports = {
  play,
  history
};
