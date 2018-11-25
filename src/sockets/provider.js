var Sensor = require('../schemas/sensors');
var Avg = require('../schemas/avgsen');
var check = false;
var roboticdata = [];
var ppms = [];
var userlog = [];
var range = 0;
var UserLog = require('../schemas/userlog');
module.exports = function(server){

    var io = require('socket.io').listen(server);
    io.on('connection', function(socket){
        socket.on('Start',function(condition){
            check = true;
            console.log("id - ",id)
		    io.emit('startnode',false);
        });
        socket.on('sensorData',function(data){
            if(check==true){
                if(ppms.length <10){
                    console.log('ppms: ', data);
                    io.emit('sensor',data);
                    ppms.push(parseFloat(data));
                }
            }
        });
        socket.on('userlog',function(data){
            userlog.push(data);
        })
        socket.on('setrange',function(data){
            range = data;
        })
        socket.on('hello_world',function(msg){
            console.log(msg)
        })
        socket.on('send_loc',function(loc){
            if(check == true){
                    console.log('hello');
                    if(roboticdata.length <10){
                        lat = parseFloat(loc.lat);
                        lon = parseFloat(loc.lon);
                        io.emit('gps_data' ,loc);
                        roboticdata.push({'lat':lat,'lon':lon});
                    }
            }
        });
        socket.on('updateState' ,function(data){
            io.emit('MoveController',data);
        });
        socket.on('checkdata' ,function(data){
            if(roboticdata.length == 10){
            }
            if(ppms.length == 10){
                console.log(ppms)
            }    
            if(roboticdata.length == 10 && ppms.length == 10){
                socket.emit('timeup' );
                check = false;
                var d = new Date();
                var n = d.getHours();
                avg = new Avg();
                peakornot = 'No';
                if(n == 8 || n == 9 || n == 17 || n==18)
                    peakornot = 'Yes';
                avglocation = averagelatlon(roboticdata);
                avgppm = averageppm(ppms);
                avg.ppm = avgppm;
                avg.lat = avglocation.lat;
                avg.lon = avglocation.lon;
                avg.date = d;
                avg.peakornot = peakornot;
                Avg.count({},function(err,avglength){
                    avg.avgid = (avglength+1);
                    avg.save();
                    for(var i = 0 ; i < roboticdata.length; i++){
                        console.log(ppm[i]);
                        userlog = new UserLog();
                        userlog.userid = req.user.username;
                        userlog.lat = roboticdata[i].lat;
                        userlog.lon = roboticdata[i].lon;
                        userlog.range = range;
                        userlog.ppm = ppm[i];
                        sen = new Sensor();
                        sen.lat = roboticdata[i].lat;
                        sen.lon = roboticdata[i].lon;
                        sen.avgid = (avglength+1);
                        sen.ppm = ppms[i];
                        sen.peak = peakornot;
                        sen.save();
                        userlog.save();
                        if(i ==9){
                            roboticdata = [];
                            ppms = [];
                            userlogs = [];
                        }
                    }
                });
            }
        });
        socket.on('Stop',function(data){
            console.log(id);
            console.log('asking to stop');
            io.emit('StopController' ,false);
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
