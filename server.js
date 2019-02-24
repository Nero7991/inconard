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
var BoardName, BoardID, SocketState;

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
	socket.on('button pressed', function(SocketNo, BoardName){
    console.log('Button '+String(SocketNo)+ ' pressed for board \'' + String(BoardName)+'\'');
		Boarddb.query('SELECT Board_id FROM Boards WHERE Board_name = ?', String(BoardName))
					 .on('result', function(res){
							BoardID = res.Board_id;
						})
						.on('end', function(){
                console.log('Board ID=' + Number(BoardID));
								Boarddb.query('SELECT Socket_State FROM Sockets WHERE Socket_No = ? AND Board_id = ?', [Number(SocketNo), BoardID])
										.on('result', function(res){
												SocketState = String(res.Socket_State);
											})
										.on('end', function(){
               				 console.log('Socket state=' + SocketState);
												if(SocketState == "OFF")
												Boarddb.query('UPDATE Sockets SET Socket_ReqState = \'ON\' WHERE Socket_No = ? AND Board_id = ?', [Number(SocketNo), BoardID]);
												else
												Boarddb.query('UPDATE Sockets SET Socket_ReqState = \'OFF\' WHERE Socket_No = ? AND Board_id = ?', [Number(SocketNo), BoardID]);
												Boarddb.query('UPDATE Sockets SET Socket_Status = \'Updating\' WHERE Socket_No = ? AND Board_id = ?', [Number(SocketNo), BoardID]);
            			});
            });
  });
});

http.listen(80, function(){
  console.log('listening on *:80');
});
