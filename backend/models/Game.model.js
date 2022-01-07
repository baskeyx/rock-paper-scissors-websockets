const mongoose = require('mongoose');

const game = mongoose.model('Games', mongoose.Schema({
  id: { 
    type: String, 
    unique: true,
    required: true,
  },
  full: {
    type: Boolean,
    required: true,
  },
  p1: {
    id: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  p2: {
    id: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  completed: {
    type: Boolean,
    required: true,
  },
  date: {
    type: Number,
    default: Date.now(),
  }
}));

export default game;