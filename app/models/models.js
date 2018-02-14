// Models
const mongoose = require('mongoose');

module.exports = {
  User: mongoose.model('User', require('./User.js'))
}
