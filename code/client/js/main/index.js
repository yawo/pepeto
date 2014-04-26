/*
 * client/js/main/index.js
 */

'use strict';

var angular = require('angular'),
    rhtml = require('rhtml');

var ngModule = angular.module('app.main', []);

// Controllers
require('./controllers/home')(ngModule);

// Routes
ngModule.config(function ($stateProvider) {
  $stateProvider
    .state('app.home', {
      url: '/',
      views: {
        '@': {
          controller: 'HomeCtrl',
          template: rhtml('./templates/home.html')
        }
      },
      resolve: {
        games: ['Restangular', function (Restangular) {
          return Restangular.all('games').getList();
        }]
      }
    });
});
