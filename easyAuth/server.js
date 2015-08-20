// server.js

// set up ======================================================================
// get all the tools we need
var express      = require('express');
var app          = express();
var server       = require('http').Server(app);
var socketio     = require('socket.io');
var io           = require('socket.io')(server);
var port         = Number (process.env.PORT || 8080)
// app.set('port', process.env.PORT || 8080)
var mongoose     = require('mongoose');
var passport     = require('passport');
var flash        = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var path         = require('path');


// var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect('mongodb://localhost/linkUp'); // connect to our database

require('./config/passport')(passport); // pass passport for configuration
app.use(express.static(path.join(__dirname, 'public')));
// set up our express application

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating
// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

///begin socket activity//
io.on('connect', function(socket){
  console.log('connected');
  socket.on('new-user', function(data){
    console.log("new user with name of "+data.name)
    io.emit('add-user', data)
  })

  socket.on('sending-location', function(data){
    console.log(data);
    io.to(data.receiver).emit('private-location', data);
  })

  socket.on('testing', function(data){
    console.log(data);
    io.emit('testing', data);
  })

  socket.on('arrow-test', function(data){
    io.emit('arrow-test', data)
    })

//begin new attempt at user tracking, wednesday
//////////////////////////////////////////////
  socket.on('arrowSocket', function(data){
    console.log(data);
    io.emit('arrowSocket', data);
  })



////end new attempt at user tracking
////////////////////////////////////

  })

  // routes ======================================================================
  require('../easyAuth/models/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================

server.listen(port);
console.log('The magic happens on port ' + port);
