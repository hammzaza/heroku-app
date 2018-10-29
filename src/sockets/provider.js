var Sensor = require('../schemas/sensors');
module.exports = function(server){
    var io = require('socket.io').listen(server);
    io.on('connection', function(socket){
        console.log('connected');
        socket.on('sensorData', function(data){
            console.log(data);
            sensorData = new Sensor();
            sensorData.temperature = data.temperature;
            sensorData.humidity = data.humidity;
            sensorData.visible = data.visible;
            sensorData.infrared = data.infrared;
            sensorData.save(function(err) {
                if (err)
                    throw err;
                res.json({"message":"Succesfully done"});
            });
            io.emit('sensor',JSON.parse(data));
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