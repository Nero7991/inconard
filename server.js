var express = require('express'); // Get the module
var app = express();
var http = require('http').Server(app);
var https = require('https');
var fs = require('fs');
var mysql = require('mysql');
var Boarddb_config = {
		host: 'localhost',
		user: 'root',
		password : 'Orencollaco123',
		database: 'boardDB'
};
var Boarddb = mysql.createConnection(Boarddb_config)
var options = {
  key: fs.readFileSync('/etc/letsencrypt/live/www.inconard.com/privkey.pem'), 
	cert: fs.readFileSync('/etc/letsencrypt/live/www.inconard.com/cert.pem'), 
	ca: fs.readFileSync('/etc/letsencrypt/live/www.inconard.com/chain.pem')
};

// Create an HTTPS service identical to the HTTP service.
var server = https.createServer(options, app).listen(3000, function(){
  console.log('listening on *:443');
});
var io = require('socket.io').listen(server);
var BoardName, BoardID, SocketState;

function handleDbDisconnect(){
	Boarddb = mysql.createConnection(Boarddb_config);
}

// Log any errors connected to the db
Boarddb.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDbDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
});    

Boarddb.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDbDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
});

app.use(express.static('public'));

app.use (function (req, res, next) {
        if (req.secure) {
                // request was via https, so do no special handling
                next();
        } else {
                // request was via http, so redirect to https
                res.redirect('https://' + req.headers.host + req.url);  //UNcomment for HTTPS
							 //next();
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
    process.stdout.write('Button '+String(SocketNo)+ ' pressed for board \'' + String(BoardName)+'\'');
		Boarddb.query('SELECT Board_id FROM Boards WHERE Board_name = ?', String(BoardName))
					 .on('result', function(res){
							BoardID = res.Board_id;
						})
						.on('end', function(){
                process.stdout.write(', Board ID=' + Number(BoardID));
								Boarddb.query('SELECT Socket_State FROM Sockets WHERE Socket_No = ? AND Board_id = ?', [Number(SocketNo), BoardID])
										.on('result', function(res){
												SocketState = String(res.Socket_State);
											})
										.on('end', function(){
               				  process.stdout.write(', Socket state=' + SocketState + '\n');
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


