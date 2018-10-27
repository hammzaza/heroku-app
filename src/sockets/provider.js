module.exports = function(server){
    var io = require('socket.io').listen(server);
    io.on('connection', function(socket){
        console.log('connected');
        socket.on('sensorData', function(data){
            //you have temp,humidity,co2level,lightintensity in a json format.
            //save this in database
            console.log(data);
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