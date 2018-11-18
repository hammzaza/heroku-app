var Sensor = require('../schemas/sensors');
var check = false;
roboticdata = [];
ppm = {};
module.exports = function(server){
    var io = require('socket.io').listen(server);
    io.on('connection', function(socket){
        console.log('connected');
        socket.on('Start',function(condition){
            check = true;
            io.emit('StartSensor',true);
            io.emit('StartScript',true);
        });
        socket.on('sensorData', function(data){
            if(check=true){
                ppm.push(data);
                io.emit('sensor',data);
            }
        });
        socket.on('gpsd',function(loc){
            if(check == true){
                setTimeout(function(){
                    roboticdata.push(loc);
                    io.emit('gpsData',loc);
                },30000);
                console.log(data);
                console.log(loc.lat);
                console.log(loc.lon);
                io.emit('gpsData',data);
            }
        });
        socket.on('updateState',function(data){
            console.log(data);
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
                //save db data
            }
        });
        socket.on('Stop',function(data){
            io.emit('StopController',false);
        });
        socket.on('stopsocket',function(state){
            check = false;
            console.log('you ended me');
            io.emit('exitsocket',false);
            io.emit('exitsensor',false);
        });
    });
}