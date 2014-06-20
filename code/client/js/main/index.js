/*
 * client/js/main/index.js
 */

'use strict';

var angular = require('angular'),
//    minify
    rhtml = require('rhtml');
var modDeps = ['ngAnimate'];
var gameTemplates = {};
/*
 * For each game, add the requires, the dependencies and the templates.
 * This is not done dynamically because of a minification of require/rhtml calls during some 'grunt' tasks.
 * These tasks need actual path of templates.
 * May be some workaround exists. Just show us if you find.
 * */

//Puissance4
require('./puissance4');
modDeps.push('app.games.puissance4');
gameTemplates['puissance4'] = {
  board: rhtml('./puissance4/templates/board.html'),
  history: rhtml('./puissance4/templates/history.html'),
  info: rhtml('./puissance4/templates/info.html'),
  actions: rhtml('./puissance4/templates/actions.html')
};

//Another game


//The module.
var ngModule = angular.module('app.main', modDeps);

// Controllers
require('./controllers/home')(ngModule);
require('./controllers/games')(ngModule);

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
     $stateParams:'$stateParams'
    }
  })
  .state('app.home.play',{
    url:'games/{gameId}/plays/{playId}',
    views:{
      'board': {
        controllerProvider:  function($state){
          console.log('$state.params.gameId',$state.params.gameId);
          return $state.params.gameId+'BoardCtrl';
        },
        templateProvider:  function($state){
          return gameTemplates[$state.params.gameId].board;
        }
      },
      'history': {
        controllerProvider:  function($state){
          return $state.params.gameId+'HistoryCtrl';
        },
        templateProvider:  function($state){
          return gameTemplates[$state.params.gameId].history;
        }
      },
      'info': {
        controllerProvider:  function($state){
          return $state.params.gameId+'InfoCtrl';
        },
        templateProvider:  function($state){
          return gameTemplates[$state.params.gameId].info;
        }
      },
      'actions': {
        controllerProvider:  function($state){
          return $state.params.gameId+'ActionsCtrl';
        },
        templateProvider:  function($state){
          return gameTemplates[$state.params.gameId].actions;
        }
      },
      'discussions':{
        controller: 'DiscussionsCtrl',
        template: rhtml('./templates/discussions.html')
      } ,
      'gameHeader':{
        controller: 'GameHeaderCtrl',
        template: rhtml('./templates/gameHeader.html')
      } ,
      '':{
        template: 'PARENT '
      }
    },
    resolve:{
      play:['Restangular','$stateParams',function(Restangular,$stateParams){
        return Restangular.one('Plays', $stateParams.playId).get({populate: 'players'});
      }]
    }
 })
 ;
});
