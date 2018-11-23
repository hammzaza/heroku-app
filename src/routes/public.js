var User = require('../schemas/user');
var Sensor = require('../schemas/sensors');
var Avg = require('../schemas/avgsen');
module.exports = function(app,passport){
    app.get('/', function(req, res) {
        res.render('login.ejs');
    });
    app.get('/home',function(req,res){
        res.render('home.ejs')
    });
    app.get('/data',function(req,res){
        Avg.find({},function(err,avgdata){
            res.render('robotdata.ejs',{'avg':avgdata});
        });
    });
    app.get('/getAnalytical/:id',function(req,res){
        var id = req.params.id;
        ppm = [];
        Sensor.find({avgid:id},function(err,data){
            for(var i = 0; i < data.length; i++)
                ppm.push(data[i].ppm)
            console.log(ppm)
            res.json({'sensor':ppm});
        });
    });
    app.get('/historical',function(req,res){
        res.render('historical.ejs');
    });
};
function isLoggedIn(req,res,next){
    if(req.isAuthenticated())
    {
            return next();
    }
    else
        res.redirect('/');
}