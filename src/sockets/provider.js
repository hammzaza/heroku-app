var Sensor = require('../schemas/sensors');
var Avg = require('../schemas/avgsen');
var check = false;
var async = require('async');
roboticdata = [];
ppm = [];
console.log(roboticdata)
console.log(ppm)
module.exports = function(server){

    var io = require('socket.io').listen(server);
    io.on('connection', function(socket){
        socket.on('Start',function(condition){
            check = true;
		    io.emit('startnode',false);
        });
        socket.on('sensorData', function(data){
            console.log(typeof(data))
            if(check==true){
                if(ppm.length <10){
                    io.emit('sensor',data);
                    ppm.push(parseFloat(data));
                }
            }
        });
        socket.on('hello_world',function(msg){
            console.log(msg)
        })
        socket.on('send_loc',function(loc){
            if(check == true){
                    console.log('hello');
                    if(roboticdata.length <10){
                        lat = parseFloat(loc.lat);
                        lon = parseFloat(loc.lon);
                        io.emit('gps_data',loc);
                        roboticdata.push({'lat':lat,'lon':lon});
                    }
            }
        });
        socket.on('updateState',function(data){
            io.emit('MoveController',data);
        });
        socket.on('checkdata',function(data){
            if(roboticdata.length == 10){
            }
            if(ppm.length == 10){
            }    
            if(roboticdata.length == 10 && ppm.length == 10){
                socket.emit('timeup');
                check = false;
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
                    for(var i = 0 ; i < roboticdata.length; i++){
                        console.log(ppm[i]);
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
        'lat':lat/list.length,
        'lon':lon/list.length
    };
}
