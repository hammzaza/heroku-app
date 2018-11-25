var User = require('../schemas/user');
var Sensor = require('../schemas/sensors');
var Avg = require('../schemas/avgsen');
module.exports = function(app,passport){

    app.get('/sensorsData/:id',isLoggedIn,function(req,res){
        Sensor.find({'avgid':req.params.id},function(err,results){
            if(err) throw err
            ppm = [];
                for(var i = 0 ; i < results.length; i ++)
                ppm.push(results[i].ppm)
            res.json({'sensors':ppm});
        });
    });
    app.get('/historicalData',isLoggedIn,function(req,res){
        Avg.find({},function(err,results){
            if(err) throw err;
            res.json({'sensors':results})
        })
    });
    app.get('/getAnalytical/:id',isLoggedIn,function(req,res){
        var id = req.params.id;
        ppm = [];
        Sensor.find({avgid:id},function(err,data){
            for(var i = 0; i < data.length; i++)
                ppm.push(data[i].ppm)
            console.log(ppm)
            res.json({'sensor':ppm});
        });
    });
    app.get('/historical',isLoggedIn,function(req,res){
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