var express = require('express'); // Get the module
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('User connected');
  socket.on('disconnect', function(){
    console.log('User disconnected');
	});
	socket.on('button pressed', function(msg){
    console.log('Button Pressed: ' + msg);
  });
});

http.listen(80, function(){
  console.log('listening on *:80');
});
