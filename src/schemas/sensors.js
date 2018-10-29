var mongoose = require('mongoose');

var SensorSchema = mongoose.Schema({
        temperature       : String,
        humidity        : String,
        visible        : String,
        infrared         : String,
});


module.exports = mongoose.model('Sensor', SensorSchema);