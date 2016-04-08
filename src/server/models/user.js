var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: String,
  goals: Array
});


module.exports = mongoose.model('User', UserSchema);
