var Sensor = require('../schemas/sensors');
module.exports = function(server){
    var io = require('socket.io').listen(server);
    io.on('connection', function(socket){
        check = false;
        console.log('connected');
        socket.on('Start',function(condition){
            io.emit('StartSensor',true);
            io.emit('StartScript',true);
        });
        socket.on('sensorData', function(data){
            io.emit('sensor',data);
            console.log(data);
            
        });
        socket.on('gpsd',function(loc){
            console.log(data);
            console.log(loc.lat);
            console.log(loc.lon)
            io.emit('gpsData',data);
        });
        socket.on('updateState',function(data){
            console.log(data);
            io.emit('MoveController',data);
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