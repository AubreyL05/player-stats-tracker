const express = require('express');
const router = express.Router();
const Player = require('../models/Player');

// Get all players
router.get('/', async (req, res) => {
  const players = await Player.find();
  res.json(players);
});

// Add a player
router.post('/', async (req, res) => {
  const newPlayer = new Player(req.body);
  const savedPlayer = await newPlayer.save();
  res.json(savedPlayer);
});

// Delete a player
router.delete('/:id', async (req, res) => {
  await Player.findByIdAndDelete(req.params.id);
  res.json({ message: 'Player deleted' });
});

router.get('/', async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
