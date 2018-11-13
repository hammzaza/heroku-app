var mongoose = require('mongoose');
var SensorSchema = mongoose.Schema({
        lat: Number,
        lon: Number,
        ppm: Number
});
module.exports = mongoose.model('Sensor', SensorSchema);