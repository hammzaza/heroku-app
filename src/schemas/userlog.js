var mongoose = require('mongoose');
var UserLogSchema = mongoose.Schema({
        lat: Number,
        lon: Number,
        ppm: Number,
        hum:Number,
        temp:Number,
        userid:String
});
module.exports = mongoose.model('UserLog', UserLogSchema);