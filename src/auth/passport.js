var LocalStrategy   = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy; 
// load up the user model
var User            = require('../schemas/user');

var configAuth = require('../config/google-config');


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
        User.findOne({ 'local.username' :  username }, function(err, user) {
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
    //////gooogle//////
    passport.use(new GoogleStrategy({
    clientID: configAuth.clientID,
    clientSecret: configAuth.clientsecret,
    callbackURL: configAuth.callbackURL,
    profileFields: ['id', 'displayName', 'link', 'photos', 'email']
  },
  function(accesstoken, refreshToken, profile, done) {
    process.nextTick(function(){
    User.findOne({'google.userid': profile.id},function(err,user){
        if(err)
            return done(err);
        if(user)
            return done(null,user);
        else
            {
                var newuser = new User();
                newuser.google.userid = profile.id;
                newuser.google.token = accesstoken;
                newuser.google.name = profile.displayName;
                newuser.google.email = profile.emails[0].value;
                newuser.save(function(err){
                   if(err)
                       throw err;
                    return done(null,newuser);
                });
                
            }
        });    
    });
                     
}
));

};