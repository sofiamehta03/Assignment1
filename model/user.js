const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// Create Model
const Schema = mongoose.Schema;

const User = new Schema({
  username: String,
  password: String
});
// Export Model
// User.plugin(passportLocalMongoose);

module.exports = mongoose.model('userData', User, 'userData');