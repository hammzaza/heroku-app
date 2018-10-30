var Sensor = require('../schemas/sensors');
module.exports = function(server){
    var io = require('socket.io').listen(server);
    io.on('connection', function(socket){
        console.log('connected');
        socket.on('sensorData', function(data){
            sen= JSON.parse(data);
            sensorData = new Sensor();
            sensorData.temperature = sen.temperature;
            sensorData.humidity = sen.humidity;
            sensorData.visible = sen.visible;
            sensorData.infrared = sen.infrared;
            sensorData.save(function(err) {
                if (err)
                    throw err;
            });
            io.emit('sensor',sen);
        });
        socket.on('updateState',function(data){
            console.log(data)
            io.emit('MoveController',data);
        });
        socket.on('Stop',function(state){
            io.emit('StopController',state);
        });
    });
};