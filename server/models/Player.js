const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: String,
  team: String,
  position: String,
  gamesPlayed: Number,
  stats: {
    points: Number,
    assists: Number,
    rebounds: Number
  }
});

module.exports = mongoose.model('Player', playerSchema);
