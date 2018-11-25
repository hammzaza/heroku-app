var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
        username:String,
        password:String
});
userSchema.methods.validPassword = function(password) {
    if(password == this.password)
        return true;
    else
        return false;
};
module.exports = mongoose.model('User', userSchema);