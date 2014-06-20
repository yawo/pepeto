/*
 * client/js/games/puissance4/index.js
 */

'use strict';

var angular = require('angular'),
    rhtml = require('rhtml');

var ngModule = angular.module('app.games.puissance4', ['ngAnimate']);

// Controllers
require('./controllers/index')(ngModule);


