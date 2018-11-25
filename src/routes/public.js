var User = require('../schemas/user');
var Sensor = require('../schemas/sensors');
var Avg = require('../schemas/avgsen');
var Robot = require('../schemas/robots');
module.exports = function(app,passport){
    app.get('/', function(req, res) {
        res.render('login.ejs');
    });
    app.get('/home',isLoggedIn,function(req,res){
        Robot.find({},function(err,data){
            console.log(req.user.username);
            res.render('home.ejs',{'avr':data})
        })
    });
    app.get('/data',isLoggedIn,function(req,res){
        console.log(req.user.username)
        Avg.find({},function(err,avgdata){
            res.render('robotdata.ejs',{'avg':avgdata});
        });
    });
    
    app.get('/admin',function(req,res){
        Robot.count({},function(err,no){
            num = no + 1;
            res.render('admin.ejs',{'number':num});
        });
    });
    
};
function isLoggedIn(req,res,next){
    console.log(req.user)
    if(req.isAuthenticated())
    {
            return next();
    }
    else
        res.redirect('/');
}