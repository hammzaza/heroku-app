var User = require('../schemas/user');
var Sensor = require('../schemas/sensors');
var Avg = require('../schemas/avgsen');
var Robot = require('../schemas/robots');
module.exports = function(app,passport){
    app.get('/', function(req, res) {
        res.render('login.ejs');
    });
    app.get('/home',function(req,res){
        Robot.find({},function(err,data){
            res.render('home.ejs',{'avr':data})
        })
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
    app.get('/admin',function(req,res){
        Robot.count({},function(err,no){
            num = no + 1;
            res.render('admin.ejs',{'number':num});
        });
    });
    app.get('/robotget/:id',function(req,res){
        Robot.find({robotid:req.params.id},function(err,data){
            console.log(data);
            res.json({'robot':data});
        })
    })
    app.post('/register-robot',function(req,res){
        robot = new Robot();
        dht = true;
        mq = true;
        sensors = req.body.sensors;
        if(sensors[0] =='0')
            dht=false
        if(sensors[1] == '0')
            mq = false;
        name = req.body.name;
        console.log(name)
        robotid = parseInt(name[name.length-1])

        robot.dht = dht;
        robot.mq = mq;
        robot.name = name;
        robot.robotid = robotid
        robot.save(function(err){
            if(err) throw err;
            res.redirect('/admin')
        });
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