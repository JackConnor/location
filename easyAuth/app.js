//Begin Server
/////////////////
var express  = require('express');
var app      = express();
var http     = require('http').Server(app);
var path     = require('path');

var socketio = require('socket.io');
var io       = socketio(http);

///End Server Requires
//////////////////////

///begin routes
//////////////////////
app.get('/', function(request, response){
  response.sendFile(__dirname+'/index.html')
})


///begin socket activity
//
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
////running the server
//////////////////////
var port = Number(process.env.PORT || 8080);

http.listen(port, function(){
  console.log('server is purring along');
});
