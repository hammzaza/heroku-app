module.exports = function(server){
    var io = require('socket.io').listen(server);
    io.on('connection', function(socket){
        console.log('connected');
        socket.on('sensorData', function(data){
            console.log(data);

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