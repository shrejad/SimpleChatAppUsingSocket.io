
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs =require('fs');
var react =require('react')

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});




io.on('connection', function(socket){
  fs.readFile(__dirname + '/images/image.jpg', function(err, buf){
    // it's possible to embed binary data
    // within arbitrarily-complex objects
    socket.emit('image', { image: true, buffer: buf });
    console.log('image file is initialized');
  });
});



io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});
io.emit('some event', { for: 'everyone' });
io.on('connection', function(socket){
  socket.broadcast.emit('hi');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

