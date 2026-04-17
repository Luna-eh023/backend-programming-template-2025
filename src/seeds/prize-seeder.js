const mongoose = require('mongoose');
const { Prize } = require('../models');

mongoose.connect('mongodb://127.0.0.1:27017/backend_quiz');

async function seed() {
  await Prize.deleteMany({});

  await Prize.insertMany([
    {
      name: 'Emas 10 gram',
      quota: 1,
      winnerCount: 0
    },
    {
      name: 'Smartphone X',
      quota: 5,
      winnerCount: 0
    },
    {
      name: 'Smartwatch Y',
      quota: 10,
      winnerCount: 0
    },
    {
      name: 'Voucher Rp100.000',
      quota: 100,
      winnerCount: 0
    },
    {
      name: 'Pulsa Rp50.000',
      quota: 500,
      winnerCount: 0
    }
  ]);

  console.log('Prize berhasil ditambahkan');
  process.exit();
}

seed();
