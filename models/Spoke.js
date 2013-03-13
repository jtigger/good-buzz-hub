var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/goodbuzzhub');

var schema = new mongoose.Schema({
  first_name : String,
  last_name : String,
  twitter_user_id : String,
  twitter_screen_name : String
});

module.exports = mongoose.model('Spoke', schema);