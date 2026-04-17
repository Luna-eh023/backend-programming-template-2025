const repo = require('./gacha-repository');

async function play(userId, userName) {
  const count = await repo.getTodayCount(userId);

  if (count >= 5) {
    throw new Error('Limit gacha 5x per hari sudah habis');
  }

  const availablePrizes = await repo.getAvailablePrize();

  let result = null;

  if (Math.random() < 0.4 && availablePrizes.length > 0) {
    result =
      availablePrizes[Math.floor(Math.random() * availablePrizes.length)];

    await repo.addWinner(result.id);
  }

  await repo.saveResult({
    userId,
    userName,
    prize: result ? result.name : null,
  });

  return result ? result.name : 'Zonk';
}

async function history(userId) {
  return repo.getHistory(userId);
}

function maskName(name) {
  return name
    .split(' ')
    .map((word) =>
      word
        .split('')
        .map((char) => (Math.random() > 0.5 ? '*' : char))
        .join('')
    )
    .join(' ');
}
async function prizes() {
  const data = await repo.getPrizes();

  return data.map((item) => ({
    name: item.name,
    remaining: item.quota - item.winnerCount,
  }));
}

async function winners() {
  const data = await repo.getWinners();

  const grouped = {};

  data.forEach((item) => {
    if (!grouped[item.prize]) grouped[item.prize] = [];

    grouped[item.prize].push(maskName(item.userName));
  });

  return Object.keys(grouped).map((prize) => ({
    prize,
    winners: grouped[prize],
  }));
}

module.exports = {
  play,
  history,
  prizes,
  winners,
};
