var mongoose = require('mongoose');
var SchemaTypes = mongoose.Schema.Types;
var SensorSchema = mongoose.Schema({
        lat: {
                type: SchemaTypes.Double
            },
        lon: {
                type: SchemaTypes.Double
        },
        ppm: {
                type: SchemaTypes.Double
        }
});
module.exports = mongoose.model('Sensor', SensorSchema);