var LocalStrategy   = require('passport-local').Strategy;
var User            = require('../schemas/user');
module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-login', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, username, password, done) {
        User.findOne({ 'username' :  username }, function(err, user) {
            console.log(user);
            if (err)
                return done(err);

            if (!user)
                return done(null, false)

            if (!user.validPassword(password))
                return done(null, false);
            return done(null, user);
        });

    }));
    //////sign--------up//////
    passport.use('sign-up', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) {
        console.log(username)
        console.log(password)
        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'username' :  username }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

                // if there is no user with that email
                // create the user
            var newUser            = new User();
            newUser.username    = username;
            newUser.password = password;
            // save the user
            newUser.save(function(err) {
                if (err)
                    throw err;
                return done(null, null);
            });
        });    

        });

    }));

};