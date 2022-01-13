const { game } = require('../models/Game.model');
const { v4: uuidv4 } = require('uuid');

const createGame = async (id) => {
  const checkGameByUserId = await game.find({
    completed: false,
    p1: { id, score: 0 },
  });

  if (!checkGameByUserId.length) {
    const createGameResponse = await game.create({
      id: uuidv4(),
      full: 0,
      p1: {
        id,
      },
      p2: {
        id: '',
      }, 
      completed: 0,
    });
    createGameResponse.success = true;
    return { createGameResponse };
  } else {
    return {
      return: false,
      gameId: checkGameByUserId[0].id,
    };
  };
};

module.exports = createGame;
