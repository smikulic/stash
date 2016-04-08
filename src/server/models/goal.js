var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Goal = new Schema({
  userId : String,
  title: String,
  value: String,
  saved: String,
  due: String
});


module.exports = mongoose.model('Goal', Goal);
