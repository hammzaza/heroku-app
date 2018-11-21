var mongoose = require('mongoose');
var SensorSchema = mongoose.Schema({
        lat: Number,
        lon: Number,
        ppm: Number,
        avgid:Number,
        peak:String
});
module.exports = mongoose.model('Sensor', SensorSchema);