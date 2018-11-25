var mongoose = require('mongoose');
var UserLogSchema = mongoose.Schema({
        lat: Number,
        lon: Number,
        ppm:Number,
        userid:String,
        range:Number
});
module.exports = mongoose.model('UserLog', UserLogSchema);