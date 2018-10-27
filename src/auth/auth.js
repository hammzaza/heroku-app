module.exports = function(app, passport) {
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/home',
            failureRedirect : '/'
        }));
        app.get('/auth/google', passport.authenticate('google',{scope: ['email']}));
        app.get('/auth/google/callback',
        passport.authenticate('google', { successRedirect: '/home',
                                      failureRedirect: '/' }));
        app.get('/logout', function(req, res) {
            req.logout();
            res.redirect('/');
        });
};