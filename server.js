var express = require('express'); // Get the module
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require('mysql');
var Boarddb = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password : 'Orencollaco123',
		database: 'boardDB'
})

// Log any errors connected to the db
Boarddb.connect(function(err){
    if (err) console.log(err)
})

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
		Boarddb.query('UPDATE Sockets SET Socket_ReqState = \'OFF\' WHERE Socket_id = ?', Number(msg));
  });
});

http.listen(80, function(){
  console.log('listening on *:80');
});
