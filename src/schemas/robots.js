var mongoose = require('mongoose');
var RobotSchema = mongoose.Schema({
        mq:Boolean,
        name:String,
        robotid:Number
});
module.exports = mongoose.model('Robot', RobotSchema);