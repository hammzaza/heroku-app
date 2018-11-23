var User = require('../schemas/user');
var Sensor = require('../schemas/sensors');
var Avg = require('../schemas/avgsen');
module.exports = function(app,passport){

    app.get('/sensorsData/:id',function(req,res){
        Sensor.find({'avgid':req.params.id},function(err,results){
            if(err) throw err
            ppm = [];
                for(var i = 0 ; i < results.length; i ++)
                ppm.push(results[i].ppm)
            res.json({'sensors':ppm});
        });
    });
    app.get('/historicalData',function(req,res){
        Avg.find({},function(err,results){
            if(err) throw err;
            res.json({'sensors':results})
        })
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