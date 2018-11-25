var mongoose = require('mongoose');
var RobotSchema = mongoose.Schema({
        dht:Boolean,
        mq:Boolean,
        name:String,
        robotid:Number
});
module.exports = mongoose.model('Robot', RobotSchema);