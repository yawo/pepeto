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
            $state.go('app.home.play',{gameId: gameId, playId: play._id});
          });
      };
      $rootScope.$on('$stateNotFound',function(){
        console.log.apply(console,arguments);
      });
      $rootScope.$on('$stateChangeError',function(){
        console.log.apply(console,arguments);
      });
    })
    ;
};
