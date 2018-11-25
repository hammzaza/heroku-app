var Robot = require('../schemas/robots');
module.exports = function(app,passport){
    app.get('/robotget/:id',function(req,res){
        Robot.find({robotid:req.params.id},function(err,data){
            console.log(data);
            res.json({'robot':data});
        })
    })
    app.post('/register-robot',function(req,res){
        robot = new Robot();
        mq = true;
        sensors = req.body.sensors;
        if(sensors[0] == '0')
            mq = false;
        name = req.body.name;
        robotid = parseInt(name[name.length-1])
        robot.mq = mq;
        robot.name = name;
        robot.robotid = robotid
        robot.save(function(err){
            if(err) throw err;
            res.redirect('/admin')
        });
    });
};