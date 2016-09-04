var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IncomeSchema = new Schema({
  userId : String,
  title: String,
  category: String,
  value: Number,
  currency: String,
  entryTime: String,
});


module.exports = mongoose.model('Income', IncomeSchema);
