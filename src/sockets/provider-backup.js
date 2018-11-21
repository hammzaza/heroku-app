var Sensor = require('../schemas/sensors');
var Avg = require('../schemas/avgsen');
var check = false;
roboticdata = [{
    'lat':12,
    'lon':12
},{
    'lat':22,
    'lon':20
},{
    'lat':35,
    'lon':30
},{
    'lat':96,
    'lon':32
},{
    'lat':57,
    'lon':56
},{
    'lat':52,
    'lon':12
},{
    'lat':11,
    'lon':21
},{
    'lat':30,
    'lon':17
},{
    'lat':24,
    'lon':13
},{
    'lat':60,
    'lon':10
}];
ppm = [2,12,32,50,36,47,52,40,50,20];
module.exports = function(server){

    var io = require('socket.io').listen(server);
    io.on('connection', function(socket){
        console.log('connected');
        socket.on('Start',function(condition){
            check = true;
            socket.emit('timeup');
            var d = new Date();
            var n = d.getHours();
            avg = new Avg();
            peakornot = 'No';
            if(n == 8 || n == 9 || n == 17 || n==18)
                peakornot = 'Yes';
            avglocation = averagelatlon(roboticdata);
            avg.ppm = averageppm(ppm);
            avg.lat = avglocation.lat;
            avg.lon = avglocation.lon;
            avg.date = d;
            avg.peakornot = peakornot;
            Avg.count({},function(err,avglength){
                avg.avgid = (avglength+1);
                avg.save();
                for(var i = 0 ; i < roboticdata.length; i ++){
                    sen = new Sensor();
                    sen.lat = roboticdata[i].lat;
                    sen.lon = roboticdata[i].lon;
                    sen.avgid = (avglength+1);
                    sen.ppm = ppm[i];
                    sen.peak = peakornot;
                    sen.save();
                }
            });
        });
    });
}
function averageppm(list){
    p = 0;
    for(var i = 0; i < list.length;i++){
        p += list[i];
    }
    return (p/list.length);
}
function averagelatlon(list){
    lat = 0;
    lon = 0;
    for(var i = 0 ; i < list.length;i++){
        lat +=list[i].lat;
        lon +=list[i].lon;
    }
    return {
        'lat':lat/list.length,
        'lon':lon/list.length
    };
}
