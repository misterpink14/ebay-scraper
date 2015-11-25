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

//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var router = express();
var server = http.createServer(router);
var io = socketio.listen(server);

router.use(express.static(path.resolve(__dirname, 'client')));
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
  async.map(
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






////

import React from 'react'
import ReactDOMserver from 'react-dom/server'
import express from 'express'
import { createPage } from './html'
import { gifs, serverGifs } from './src/data'
import App from './src/App'

const gifData = [ ...gifs, ...serverGifs ]

const app = express()
const port = process.env.PORT || 3000
app.get('/', (req, res, next) => res.send(
  createPage(ReactDOMserver.renderToString(<App gifs={gifData} />))
))

app.listen(port, () => console.log(`listening on port ${port}`))





// import React from 'react'
// import ReactDOMserver from 'react-dom/server'
// import express from 'express'
// import { createPage } from './html'
// import { gifs, serverGifs } from './src/data'
// import router from './src/App'
// import Router from 'react-router';
// import path from 'path';



// const gifData = [ ...gifs, ...serverGifs ]

// const app = express()
// const port = process.env.PORT || 3000


// // app.use((req, res) => {
// //   Router.run(router, req.path, (Handler) => {
// //     res.send('<!DOCTYPE html>' + React.renderToString(routes));
// //   });
// // });



// app.get('/', (req, res, next) => res.send(
//   createPage('<!DOCTYPE html><html><body>' + React.renderToString(router) + '</body></html>')
// ))

// app.listen(port, () => console.log(`listening on port ${port}`))








//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//







/*
var http = require('http');
var path = require('path');

var async = require('async');
var socketio = require('socket.io');
import express from 'express';  
import webpack from 'webpack';  
import webpackMiddleware from 'webpack-dev-middleware';  
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config.js';

//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var router = express();
var server = http.createServer(router);
var io = socketio.listen(server);

const compiler = webpack(config);

router.use(express.static(path.resolve(__dirname, 'public')));
router.use(webpackMiddleware(compiler)); 
router.use(webpackHotMiddleware(compiler));

router.get('*', function response(req, res) {  
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

router.listen(8081);  




*/


/*
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
  async.map(
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
*/
