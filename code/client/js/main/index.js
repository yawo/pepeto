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
  .state('app.home.game',{
    url:'games/{gameId}',
    views:{
      '@':{
        controller:'GameCtrl',
        template: rhtml('./templates/game.html')
      }
    },
    resolve:{
      plays:['Restangular','$stateParams',function(Restangular,$stateParams){
        return Restangular.all('Plays').getList({game:$stateParams.gameId, state:'1',select:'_id,state,players' });
      }],
     $stateParams:"$stateParams" 
    }
  });
});
