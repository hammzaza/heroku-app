module.exports = function(server){
    var io = require('socket.io').listen(server);
    io.on('connection', function(socket){
        socket.on('SensorData', function(data){
            //you have temp,humidity,co2level,lightintensity in a json format.
            //save this in database
        });
    });
};