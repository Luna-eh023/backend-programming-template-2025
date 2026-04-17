const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  userId: String,
  userName: String,
  prize: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = schema;
