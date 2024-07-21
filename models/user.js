const mongoose = require('mongoose');

const animeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['plan to watch', 'watching', 'completed', 'dropped'],
    required: true
  },
  recommended: {
    type: Boolean,
    default: false
  }
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  animes: [animeSchema] 
});

const User = mongoose.model('User', userSchema);

module.exports = User;
