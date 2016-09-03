var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: String,
  income: String,
  incomes: Array,
});


module.exports = mongoose.model('User', UserSchema);
