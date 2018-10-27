var User = require('../schemas/user');
module.exports = function(app){
    app.get('/', function(req, res) {
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