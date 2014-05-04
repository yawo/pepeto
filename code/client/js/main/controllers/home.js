/*
 * client/js/main/controllers/home.js
 */

'use strict';

exports = module.exports = function (ngModule) {
  ngModule
    .controller('HomeCtrl', function ($scope, games) {
      $scope.games = games;
    })
    .controller('GameCtrl', function ($scope,  plays) {
      $scope.plays = plays;
    })
    .controller('PlayCtrl',function ($scope,play  ) {
      $scope.play = play;
    });

};
