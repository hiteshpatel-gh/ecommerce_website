var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var State = new Schema({
    StId: {type: String},
    StName: {type: String},
    Status: {type: String},
}, {collection: 'State'});
module.exports = mongoose.model('State', State);