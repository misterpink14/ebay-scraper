/*

TODO
	[x] Get mongo/mongoose working 
		[x] Basic setup
		[x] Add user object -- reference => mongoosejs.com/docs/index.html
		[x] Add item object -- pick a better name than item
	[] Add endpoints for
		[] Login / users
		[] Saved items
	[] Implement password security
	[] Use socketio instead of express
		

*/




//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//
var http = require('http');
var path = require('path');
var async = require('async');
var socketio = require('socket.io');
var express = require('express');
var bodyParser = require('body-parser');

/* Webpack -- compile react */
import webpackMiddleware from 'webpack-dev-middleware';  
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack'

//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var router = express();
var server = http.createServer(router);
var io = socketio.listen(server);
import config from './webpack.config.js';

const compiler = webpack(config); // compile

/* Setup Mongoose */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ebay');
var User = require("./models/User");

router.use(express.static(path.resolve(__dirname, 'public')));
router.use(webpackMiddleware(compiler)); 
router.use(webpackHotMiddleware(compiler));
router.use(bodyParser());

/* Connect to the db */
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) 
{
	console.log("success");
});

/* Cache */
var messages = [];
var sockets = [];




io.on('connection', function (socket) 
{
	messages.forEach(function (data) 
	{
		socket.emit('message', data);
	});

	sockets.push(socket);

	socket.on('disconnect', function () 
	{
		sockets.splice(sockets.indexOf(socket), 1);
		updateRoster();
	});

	socket.on('message', function (msg) 
	{
		var text = String(msg || '');
		if (!text)
			return;

		socket.get('name', function (err, name) 
		{
			var data = 
			{
				name: name,
				text: text
			};

			broadcast('message', data);
			messages.push(data);
		});
	});

	socket.on('identify', function (name) 
	{
		socket.set('name', String(name || 'Anonymous'), function (err) 
		{
			updateRoster();
		});
	});
});

function updateRoster() 
{
	async.map
	(
		sockets,
		function (socket, callback) 
		{
			socket.get('name', callback);
		},
		function (err, names) 
		{
			broadcast('roster', names);
		}
	);
}

function broadcast(event, data) 
{
	sockets.forEach(function (socket) 
	{
		socket.emit(event, data);
	});
}

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function()
{
	var addr = server.address();
	console.log("Chat server listening at", addr.address + ":" + addr.port);
});

router.post("/user",function(request, response){
	console.log(request.body)
	
	var email = request.body.email;
	var password = request.body.password;
	
    var newUser = new User({ 
    	Username: email, 
	    Password: password, 
	    Items: [] 
    });
	newUser.save(function (err) {
	  if (err)
	  {
	  	console.log("Error!");
	  	response.send("Failure\n");
	  }
	  else
	  {
	  	console.log("saved user");
	    response.send("OK\n");
	  }
	});
});


router.put("/user", function(req, res) {
	console.log(req.body);
	var email = req.body.email;
	var password = req.body.password;
	
	
	User.findOne(
		{
			'Username': email,
			'Password': password
		},
		function (err, user) {
			console.log(user);
			res.json(user);
		}
	);
});


router.get('/Users', function(req, res, next) {
  User.find(function(err, data){
    if(err){ return next(err); }
    res.json(data);
  });
});