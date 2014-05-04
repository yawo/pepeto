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
        return Restangular.all('Games').getList();
      }]
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
        return Restangular.all('Plays').getList({game:$stateParams.gameId, state:'<4' });
      }]
    }
  })
  .state('app.home.game.play',{
    url:'/plays/{playId}',
    views:{
      '@':{
        controller:'PlayCtrl',
        template: rhtml('./templates/play.html')
      }
    },
    resolve:{
      play:['Restangular','$stateParams',function(Restangular,$stateParams){
        if($stateParams.playId == 0){
          return Restangular.all('Plays').post({game:$stateParams.gameId});
        }else{
          return Restangular.one('Plays',$stateParams.playId).get();
        }
      }]
    }
  })

;
});
