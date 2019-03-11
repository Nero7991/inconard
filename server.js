process.on('uncaughtException', function (exception) {
  console.log(exception); // to see your exception details in the console
  // if you are on production, maybe you can send the exception details to your
  // email as well ?
});

var express = require('express'); // Get the module
var errorhandler = require('errorhandler');
var app = express();
app.use(errorhandler({ dumpExceptions: true, showStack: true }));
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
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
	console.log('GET URL: ', req.url);
  res.sendFile(__dirname + '/login.html');
});

app.get('/register.html', function(req, res){
	res.sendFile(__dirname + '/register.html');
});

app.get('/board.html', function(req, res){
	var qres = null;
	console.log(req.query.session_id);
	Boarddb.query('SELECT * FROM Boards WHERE Session_id = ?', req.query.session_id)
				.on('result', function(res1){
					qres = res1;
				})
				.on('end', function(){
					if(qres){
						res.sendFile(__dirname + '/board.html');
					}
					else {
						res.sendFile(__dirname + '/login.html');
					}
					console.log('Query ended');
				});
});

io.on('connection', function(socket){
  console.log('User connected');
  socket.on('disconnect', function(){
    console.log('User disconnected');
	});
	socket.on('tryToLogin', function(Boardname, Password){
		var qres = null;
    console.log('Login Attempt using Board name: ' + String(Boardname));
		Boarddb.query('SELECT * FROM Boards WHERE Board_name = ?', Boardname)
					.on('result', function(res){
						qres = res;
					})
					.on('end', function(){
						if(qres){
								bcrypt.compare(Password, qres.Board_pass, function(err, res1) {
									if(err)
										console.log('Bcrypt Error:' + err);
									if(res1){
										console.log('Login success');
										bcrypt.hash(Math.random().toString(), saltRounds, function(err, hash){
											if(err)
												console.log('Bcrypt Error:' + err);
											Boarddb.query('UPDATE Boards SET Session_id = ? WHERE Board_name = ?', [hash, Boardname]);
											socket.emit('tryToLoginSuccess', hash);		//Tell client, login successful
										});
									}
									else {
											console.log('Login failed');
											socket.emit('tryToLoginFailed', "Incorrect board name or password, please try again.");
									}
								});
						}
						else {
								console.log('Login failed');
								socket.emit('tryToLoginFailed', "Board name does not exist, please try again.");
						}
					});

	});

	socket.on('getBoardDetails', function(Session_id){
		console.log(Session_id);
		var qres = null;
		Boarddb.query('SELECT * FROM Boards WHERE Session_id = ?', Session_id)
						.on('result', function(res){
							qres = res;
						})
						.on('end', function(){
							if(qres){
								console.log('Board found');
								socket.emit('boardDetailsFromSession', qres);
							}
							else {
								socket.emit('sessionNotFound');
							}
						});
	});

	socket.on('tryToRegister', function(Boardname, Oldpassword, Newpassword){
		var qres = null;
    console.log('Register Attempt using Board name: ' + String(Boardname));
		Boarddb.query('SELECT * FROM Boards WHERE Board_name = ?', Boardname)
					 .on('result', function(res){
					  	qres = res;
						})
					 .on('end', function(){
							if(qres){
 							 console.log('Board found');
 							 if(qres.Board_pass == "password"){
 								 console.log('Hashing...');;
 								 bcrypt.hash(Newpassword, saltRounds, function(err, hash) {
 									 if(err)
 									 console.log('Bcrypt Error:' + err);
 									 Boarddb.query('UPDATE Boards SET Board_pass = ? WHERE Board_name = ?', [hash, Boardname])	// Store hash in your password DB.
 									 socket.emit('tryToRegisterSuccess');		//Tell client, registered successful
 									 console.log('Registered successfully');
 								 });
 							 }
 							 else{
 								 bcrypt.compare(Oldpassword, res.Board_pass, function(err, comp_res) {
 										 if(err)
 										 console.log('Bcrypt Error:' + err);
 										 if(comp_res == true){
 											 bcrypt.hash(Newpassword, saltRounds, function(err, hash) {
 												 if(err)
 												 console.log('Bcrypt Error:' + err);
 												 Boarddb.query('UPDATE Boards SET Board_pass = ? WHERE Board_name = ?', [hash, BoardName])	// Store hash in your password DB.
 												 socket.emit('tryToRegisterSuccess');		//Tell client, registered successful
 												 console.log('Registered successfully');
 											 });
 										 }
 										 else {
 											 socket.emit('tryToRegisterFailed', 'Invalid');
 											 console.log('Registering failed');
 										 }
 								 });
 							 }
 						 }
 						 else {
 								 socket.emit('tryToRegisterFailed', 'NoBoard');
 								 console.log('Registering failed');
 						 }
							console.log('Query ended');
						});
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
