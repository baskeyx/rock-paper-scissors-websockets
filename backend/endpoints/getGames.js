const { game } = require('../models/Game.model');

const getGames = async () => {
  const games = await game.find({
    completed: 0,
    full: 0,
  });
  return games;
}

module.exports = getGames;
