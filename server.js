var express = require('express');
var ejs = require('ejs');
var path = require('path');
var bodyParser = require('body-parser');
var port = process.env.PORT || 8080;
var app = express();  
var mongoose = require('mongoose');
var passport = require('passport');
var session      = require('express-session');
var cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(session({ secret: 'hauthlogggg' }));
app.use(passport.initialize());
app.use(passport.session());

  
app.set('view-engine', '.ejs');
app.set('views', 'src/views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
var configDB = require('./src/config/mongodb');

mongoose.connect(configDB);
require('./src/auth/auth')(app,passport);
require('./src/auth/passport')(passport);
require('./src/routes/public')(app);
var server = app.listen(port, function(){
    console.log("Listening on port "+ port);
});
require('./src/sockets/provider')(server);