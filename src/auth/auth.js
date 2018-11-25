module.exports = function(app, passport) {
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/home',
            failureRedirect : '/'
        }));
        app.post('/sign-up', passport.authenticate('sign-up', {
            successRedirect : '/',
            failureRedirect : '/',
            failureFlash : true
        }));
        app.get('/logout', function(req, res) {
            req.logout();
            res.redirect('/');
        });
};