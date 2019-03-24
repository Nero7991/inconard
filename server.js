process.on('uncaughtException', function (exception) {
  console.log(exception); // to see your exception details in the console
  // if you are on production, maybe you can send the exception details to your
  // email as well ?
});
var connectedClients = 0;
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
var Boarddb = mysql.createConnection(Boarddb_config);
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
	Boarddb.connect(function(err) {              // The server is either down
	    if(err) {                                     // or restarting (takes a while sometimes).
	      console.log('error when connecting to db:', err);
	      setTimeout(handleDbDisconnect, 2000); // We introduce a delay before attempting to reconnect,
	    }                                     // to avoid a hot loop, and to allow our node script to
	});
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

app.get('/login.html', function(req, res){
	res.sendFile(__dirname + '/login.html');
});

app.get('/board.html', function(req, res){
	var qres = null;
	console.log(req.query.session_token);
	Boarddb.query('SELECT * FROM Sessions WHERE Session_token = ?', req.query.session_token)
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
	//socket.emit('someting', "yum", "num", 1);
	var clientID, Remember1 = null;
	var Session_token1 = null;

	var Board_uid = null;
	connectedClients += 1;
	clientID = connectedClients;
  console.log('User connected, Client ID : ' + clientID + ' Count : ' + connectedClients);
	var PingTestTimer;
	var BoardPingOK = null;
	var isBoard = false;

	function checkBoardLink(){
		if(BoardPingOK){
			BoardPingOK = null;
			//PingTestTimer = setTimeout(checkBoardLink, 2000);
		}
		else {
			if(isBoard){
				Boarddb.query('UPDATE Boards SET Board_sid = null, Board_status = \'Not Connected\' WHERE Board_uid = ?',[Board_uid], function(err, res2){
					//console.log('here2');
					if(err){
						console.log('Database error:' + err);
					}
					if(res2.affectedRows){
						isBoard = null;
						console.log('Board disconnected, ping timeout');
						io.sockets.emit('boardDisconnected','');
					}
				});
			}
		}
	}
	socket.on('ping', function(){
		//console.log("Pinged");
		BoardPingOK = "YES";
	});
  socket.on('disconnect', function(){
		if(isBoard){
			Boarddb.query('UPDATE Boards SET Board_sid = null, Board_status = \'Not Connected\' WHERE Board_uid = ?',[Board_uid], function(err, res2){
				//console.log('here2');
				if(err){
					console.log('Database error:' + err);
				}
				if(res2.affectedRows){
					isBoard = null;
					console.log('Board disconnected');
					io.sockets.emit('boardDisconnected','');
				}
			});
		}
		if(Session_token1 && Remember1 == 0){
			Boarddb.query('DELETE FROM Sessions WHERE Session_token = ?', Session_token1, function(err, res){
				if(err || (res.affectedRows == 0)){

				}
			});
		}
		connectedClients -= 1;
    console.log('User disconnected, Client ID : ' + clientID + ' Count : ' + connectedClients);
	});

	socket.on('isSessionValid', function(Session_token){
		var qres = null;
		Boarddb.query('SELECT * FROM Sessions WHERE Session_token = ?', Session_token)
						.on('result', function(res){
							qres = res;
						})
						.on('end', function(){
							if(qres){
								socket.emit('sessionValid');
							}
							else {
								socket.emit('sessionNotFound');
							}
						});
	});

	socket.on('tryToLogin', function(Boardname, Password, Remember){
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
											Boarddb.query('INSERT INTO Sessions (Session_token, Session_remember, Session_creation, Board_id, Board_name) VALUES (?, ?, ?, ?, ?)', [hash, Remember, (new Date()).toString(), qres.Board_id, qres.Board_name], function(err, result){
												if(err || result.affectedRows == 0){
													socket.emit('tryToLoginFailed', "Database error");
												}
												else{
													socket.emit('tryToLoginSuccess', hash);		//Tell client, login successful
												}
											});

										});
									}
									else {
											console.log('Login failed');
											socket.emit('tryToLoginFailed', "Incorrect password, please try again.");
									}
								});
						}
						else {
								console.log('Login failed');
								socket.emit('tryToLoginFailed', "Board name does not exist, please try again.");
						}
					});

	});

	socket.on('tryToLogout', function(Session_token){
		Boarddb.query('DELETE FROM Sessions WHERE Session_token = ?', [Session_token], function(err, res){
			if(err || (res.affectedRows == 0)){
				socket.emit('tryToLogoutFailed', "Database error");
			}
			else {
				socket.emit('tryToLogoutSuccess');
				}
		});	//
	});

	socket.on('getBoardDetails', function(Session_token){
		//console.log(Session_token);
		var qres = null;
		var qres2 = null;
		var Board_id = null;
		Session_token1 = Session_token;
		Boarddb.query('SELECT * FROM Sessions WHERE Session_token = ?', Session_token)
						.on('result', function(res){
							qres = res;
						})
						.on('end', function(){
							if(qres){
								Remember1 = qres.Session_remember;
								//console.log('Board found');
								//socket.emit('boardDetailsFromSession', qres);
								Board_id = qres.Board_id;
								Boarddb.query('SELECT * FROM Boards WHERE Board_id = ?', Board_id)
									.on('result', function(res){
										qres = res;
									})
									.on('end', function(){
									Boarddb.query('SELECT * FROM Sockets WHERE Board_id = ?', Board_id, function(err, res2){
										qres2 = res2;
										if(err){
											throw err
										}
										if(qres2){
											socket.emit('boardDetailsFromSession', qres, qres2);
										}
										else {
											socket.emit('sessionNotFound');
										}
									});
								});
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
 								 bcrypt.compare(Oldpassword, qres.Board_pass, function(err, comp_res) {
 										 if(err)
 										 console.log('Bcrypt Error:' + err);
 										 if(comp_res == true){
 											 bcrypt.hash(Newpassword, saltRounds, function(err, hash) {
 												 if(err)
 												 console.log('Bcrypt Error:' + err);
 												 Boarddb.query('UPDATE Boards SET Board_pass = ? WHERE Board_name = ?', [hash, Boardname])	// Store hash in your password DB.
 												 socket.emit('tryToRegisterSuccess');		//Tell client, registered successful
 												 console.log('Registered successfully');
 											 });
 										 }
 										 else {
 											 socket.emit('tryToRegisterFailed', "Invalid old password. Please try again.");
 											 console.log('Registering failed');
 										 }
 								 });
 							 }
 						 }
 						 else {
 								 socket.emit('tryToRegisterFailed', "Board name does not exist. Please try again");
 								 console.log('Registering failed');
 						 }
							console.log('Query ended');
						});
	});

	socket.on('attemptToConnect', function(board_uid, Board_sid){
		var qres = null;
		console.log('Attempt to connect, Board UID: ' + board_uid + ', Board SID: ' + Board_sid);
		Boarddb.query('SELECT * FROM Boards WHERE Board_uid = ?', String(board_uid))
		 	.on('result', function(res){
				qres = res;
			})
			.on('end', function(){
				if(qres){
					//console.log('here');
					Boarddb.query('UPDATE Boards SET Board_sid = ?, Board_status = \'Connected\' WHERE Board_name = ?',[Board_sid, qres.Board_name], function(err, res2){
						//console.log('here2');
						if(err){
							console.log('Database error:' + err);
						}
						if(res2.affectedRows){
							Board_uid = qres.Board_uid;
							isBoard = true;
							//PingTestTimer = setTimeout(checkBoardLink, 2000);
							BoardPingOK = "YES";
							console.log('Board Connected');
							io.sockets.emit('boardConnected', '');
							//socket.emit('updateClientDetails');
						}
					});
				}
			});
	});

	socket.on('writeSocketStateSuccess', function(Board_uid, SocketNo){
		var qres = null, SocketReqState = "OFF";
    process.stdout.write('Write success for socket '+String(SocketNo));
		Boarddb.query('SELECT * FROM Boards WHERE Board_uid = ?', String(Board_uid))
					 .on('result', function(res){
							BoardID = res.Board_id;
							qres = res;
						})
						.on('end', function(){
                process.stdout.write(', Board ID=' + Number(BoardID));
								Boarddb.query('SELECT Socket_ReqState FROM Sockets WHERE Socket_No = ? AND Board_id = ?', [Number(SocketNo), BoardID])
										.on('result', function(res){
												SocketReqState = String(res.Socket_ReqState);
											})
										.on('end', function(){
               				  process.stdout.write(', Socket state=' + SocketReqState + '\n');
												if(SocketReqState == "ON"){
													Boarddb.query('UPDATE Sockets SET Socket_State = \'ON\' WHERE Socket_No = ? AND Board_id = ?', [Number(SocketNo), BoardID]);
													socket.broadcast.emit('socketStateChanged', String(SocketNo), 'ON');
												}
												else{
													Boarddb.query('UPDATE Sockets SET Socket_State = \'OFF\' WHERE Socket_No = ? AND Board_id = ?', [Number(SocketNo), BoardID]);
													socket.broadcast.emit('socketStateChanged', String(SocketNo), 'OFF');
												}
												Boarddb.query('UPDATE Sockets SET Socket_Status = \'Updating\' WHERE Socket_No = ? AND Board_id = ?', [Number(SocketNo), BoardID]);
            				});
            });
  });

	socket.on('button pressed', function(SocketNo, BoardName){
		var qres = null;
    process.stdout.write('Button '+String(SocketNo)+ ' pressed for board \'' + String(BoardName)+'\'');
		Boarddb.query('SELECT * FROM Boards WHERE Board_name = ?', String(BoardName))
					 .on('result', function(res){
							BoardID = res.Board_id;
							qres = res;
						})
						.on('end', function(){
                process.stdout.write(', Board ID=' + Number(BoardID));
								Boarddb.query('SELECT Socket_State FROM Sockets WHERE Socket_No = ? AND Board_id = ?', [Number(SocketNo), BoardID])
										.on('result', function(res){
												SocketState = String(res.Socket_State);
											})
										.on('end', function(){
               				  process.stdout.write(', Socket state=' + SocketState + '\n');
												if(SocketState == "OFF"){
													Boarddb.query('UPDATE Sockets SET Socket_ReqState = \'ON\' WHERE Socket_No = ? AND Board_id = ?', [Number(SocketNo), BoardID]);
														if(qres.Board_status == "Connected"){
														console.log('Sending request to board...');
														io.to(qres.Board_sid).emit('writeSocketState', String(SocketNo), 'ON');
													}
												}
												else{
													Boarddb.query('UPDATE Sockets SET Socket_ReqState = \'OFF\' WHERE Socket_No = ? AND Board_id = ?', [Number(SocketNo), BoardID]);
														if(qres.Board_status == "Connected"){
														console.log('Sending request to board...');
														io.to(qres.Board_sid).emit('writeSocketState', String(SocketNo), 'OFF');
													}
												}
												Boarddb.query('UPDATE Sockets SET Socket_Status = \'Updating\' WHERE Socket_No = ? AND Board_id = ?', [Number(SocketNo), BoardID]);
            				});
            });
  });

});

http.listen(8080, function(){
  console.log('listening on *:80');
});
