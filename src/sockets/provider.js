var Sensor = require('../schemas/sensors');
module.exports = function(server){
    var io = require('socket.io').listen(server);
    io.on('connection', function(socket){
        check = false;
        console.log('connected');
        socket.on('Start',function(condition){
            check = true;
            console.log('you started me')
            io.emit('StartSensor',true);
            io.emit('StartScript',true);
            socket.on('sensorData', function(data){
                io.emit('sensor',data);
                console.log(data);
                socket.on('Gps_Data',function(loc){
                    console.log(data);
                    console.log(loc.lat);
                    console.log(loc.lon)
                    io.emit('gpsData',data);

                    sens = new Sensor();
                    sens.ppm =  parseFloat(data)
                    sens.lat =  parseFloat(loc.lat);
                    sens.lon =  parseFloat(loc.lon)
                    sen.save(function(err) {
                        if (err)
                            throw err;
                    });
                });
            });
            socket.on('updateState',function(data){
                console.log(data);
                io.emit('MoveController',data);
            });
            socket.on('stopsocket',function(state){
                check = false;
                console.log('you ended me');
                io.emit('exitsocket',false);
                io.emit('exitsensor',false);
            });
        });
        
        
    });
}