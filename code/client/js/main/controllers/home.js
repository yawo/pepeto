/*
 * client/js/main/controllers/home.js
 */

'use strict';

exports = module.exports = function (ngModule) {
  ngModule
    .controller('HomeCtrl', function ($scope,$state,$rootScope, restangulars) {
      $scope.games = restangulars.gameList; 
      $scope.newPlay = function(gameId){
          $scope.gameId = gameId;
          restangulars.Plays.post({game: gameId}).then(function(play){
          $state.go('.game.play',{gameId: gameId, playId: play._id});
        });
      };
    })
    .controller('GameCtrl', function ($scope, $rootScope, $stateParams,  plays) {
      $scope.plays = plays;
      $scope.gameId = $stateParams.gameId;
    });
};
