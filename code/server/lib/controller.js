/*
 * server/lib/controller.js
 */

'use strict';

var path = require('path');

var app = require('../app');

function catchAll(req, res) {
  res.render('empty', {
    catchAll: true
  });
}

function error404(req, res) {
  res.status(404).sendfile(path.join(
    path.join(app.dir, '..', app.project.path.static),
    '404.html'
  ));
}

//Middlewares
function newGameHandler(req,res,next){
  if(req.method === 'post'){
    var game = req.params;
    game.players = [req.user];
  }
  next();
}


// Public API
exports.catchAll = catchAll;
exports.error404 = error404;
exports.newGameHandler = newGameHandler;
