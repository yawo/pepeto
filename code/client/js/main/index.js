/*
 * client/js/main/index.js
 */

'use strict';

var angular = require('angular'),
//    minify
    rhtml = require('rhtml');

var ngModule = angular.module('app.main', ['ngAnimate']);

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
      restangulars: ['Restangular', function (Restangular) {
        return {gameList: Restangular.all('Games').getList().$object, Plays: Restangular.all('Plays')};
      }],
     $state:"$state"
    }
  })
  ;
});
