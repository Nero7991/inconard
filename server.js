var express = require('express'); // Get the module
var app = express();
var http = require('http').Server(app);
var https = require('https');
var fs = require('fs');
var io = require('socket.io')(http);
var mysql = require('mysql');
var Boarddb = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password : 'Orencollaco123',
		database: 'boardDB'
})

var options = {
  key: fs.readFileSync('client-key.pem'),
  cert: fs.readFileSync('client-cert.pem')
};

var BoardName, BoardID, SocketState;

// Log any errors connected to the db
Boarddb.connect(function(err){
    if (err) console.log(err)
})

app.use(express.static('public'));

app.use (function (req, res, next) {
        if (req.secure) {
                // request was via https, so do no special handling
                next();
        } else {
                // request was via http, so redirect to https
                res.redirect('https://' + req.headers.host + req.url);
        }
});

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

http.listen(8080, function(){
  console.log('listening on *:80');
});

// Create an HTTPS service identical to the HTTP service.
https.createServer(options, app).listen(3000, function(){
  console.log('listening on *:443');
});
