var Sensor = require('../schemas/sensors');
var Avg = require('../schemas/avgsen');
var check = false;
var async = require('async');
roboticdata = [];
ppm = [];
module.exports = function(server){

    var io = require('socket.io').listen(server);
    io.on('connection', function(socket){
        console.log('connected');
        socket.on('Start',function(condition){
            check = true;
		    io.emit('startnode',false);
        });
        socket.on('sensorData', function(data){
            console.log('sensor');
            if(check==true){
                if(ppm.length <10){
                    console.log(data);
                    io.emit('sensor',data);
                    ppm.push(parseInt(data));
                    
                }
            }
        });
        socket.on('locationdata',function(loc){
            console.log('gps')
            if(check == true){
                    if(roboticdata.length <10){
                        console.log(loc);
                        lat = parseInt(loc.lat);
                        lon = parseInt(loc.lon);
                        io.emit('gpsData',loc);
                        roboticdata.push({'lat':lat,'lon':lon});
                    }
            }
        });
        socket.on('updateState',function(data){
            io.emit('MoveController',data);
        });
        socket.on('checkdata',function(data){
            if(roboticdata.length == 10){
                console.log(roboticdata);
            }
            if(ppm.length == 10){
                console.log(ppm);
            }    
            if(roboticdata.length == 10 && ppm.length == 10){
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
            }
        });
        socket.on('Stop',function(data){
            console.log('asking to stop');
            io.emit('StopController',false);
        });
    });
}
function averageppm(list){
    ppm = 0;
    for(var i = 0; i < list.length;i++){
        ppm += list[i];
    }
    return (ppm/list.length);
}
function averagelatlon(list){
    lat = 0;
    lon = 0;
    for(var i = 0 ; i < list.length;i++){
        lat +=list[i].lat;
        lon +=list[i].lon;
    }
    return {
        'lat':lat,
        'lon':lon
    };
}
