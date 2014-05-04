/*
 * server/routes.js
 */

'use strict';

// var ultimate = require('ultimate');

// Register controllers to routes.
var restifyMongoose = require('express-restify-mongoose');
exports.register = function (app, restify) {
  var c = app.controllers,
      m = app.models,
      l = app.lib.controller,
      s = app.servers.express.getServer(),
      error404 = l.error404;

  // var ensureAdmin = ultimate.server.controller.ensureAdmin,
  //     ensureGuest = ultimate.server.controller.ensureGuest,
  //     ensureUser = ultimate.server.controller.ensureUser,
  //     csrf = ultimate.server.controller.csrf;
  
  //Mongoose API
  restifyMongoose.serve(s,m.Play,{middleware:l.newGameHandler});
  restifyMongoose.serve(s,m.Game);

  // API
  //restify.model('/api/v1/features', 'Feature');
  //restify.model('/api/v1/games', 'Game');
  //restify.model('/api/v1/plays', 'Play');
  restify.model('/api/v1/users', 'User');
  restify.any  ('/api/v1/login', c.api.auth.login, ['post']);
  restify.any  ('/api/v1/logout', c.api.auth.logout, ['post']);
  restify.any  ('/api/v1/me', c.api.auth.me, ['list']);
  restify.any  ('/api/v1/register', c.api.auth.register, ['post']);
  restify.any  ('/api/v1/test/any', c.api.test, ['list', 'get']);
  restify.user ('/api/v1/test/user', c.api.test, ['list', 'get']);
  restify.admin('/api/v1/test/admin', c.api.test);
  s.get(/^\/api\/v1(?:[\/#?].*)?$/, error404);

  // Home
  s.get('/', c.home.index);
  s.get('/dashboard', c.home.dashboard);
  s.get('/page', c.home.page);
  s.get('/task', c.home.task);

  // Auth
  s.get('/auth/facebook', c.auth.facebook);
  s.get('/auth/facebook/callback', c.auth.facebookCallback);
  s.get('/auth/google', c.auth.google);
  s.get('/auth/google/callback', c.auth.googleCallback);
  s.get('/auth/twitter', c.auth.twitter);
  s.get('/auth/twitter/callback', c.auth.twitterCallback);

  // Status
  s.get('/status', c.status.index);
  s.get('/status/health', c.status.health);

  // Catch all
  s.get('*', app.lib.controller.catchAll);
};
