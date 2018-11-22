var socket = require('socket.io-client')('http://localhost:8080');
socket.on('connect', function(){
    // while(true){
    //     wait(5000);
    //     console.log('Emitting')
    //     socket.emit('hello_world','whats up');
    // }
    socket.on('startnode',function(data){
        console.log('hello');
        socket.emit('hello_world','whats up');
    });
    
});
function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
}

