var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Account = new Schema({
    email: String,
    updated_at: Date,
    savingsData: Schema.Types.Mixed
});


module.exports = mongoose.model('Account', Account);
