var User = require('../schemas/user');
module.exports = function(app,passport){
    app.get('/',isLoggedIn, function(req, res) {
        res.render('login.ejs');
    });
    app.get('/test',function(req,res){
        newUser = new User();
        newUser.local.username = 'hamza';
        newUser.local.password = '1@34qwer';
        newUser.save(function(err) {
            if (err)
                throw err;
            res.json({"message":"Succesfully done"});
        });
    });
    app.get('/home',function(req,res){
        res.render('home.ejs')
    })
    
};
function isLoggedIn(req,res,next){
    if(req.isAuthenticated())
    {
            return next();
    }
    else
        res.redirect('/');
}