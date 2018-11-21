var mongoose = require('mongoose');
var AvgSchema = mongoose.Schema({
        lat: Number,
        lon: Number,
        ppm: Number,
        date:Date,
        peakornot:String,
        avgid:Number,
});
module.exports = mongoose.model('Avg', AvgSchema);