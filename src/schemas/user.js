var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    local: {
        username:String,
        password:String
    },
    google: {
        userid       : String,
        token        : String,
        email        : String,
        name         : String
    }
});
userSchema.methods.validPassword = function(password) {
    if(password == this.local.password)
        return true;
    else
        return false;
};


module.exports = mongoose.model('User', userSchema);