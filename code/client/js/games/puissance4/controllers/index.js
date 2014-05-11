/*
 * client/js/games/puissance4/controllers/index.js
 */

'use strict';

exports = module.exports = function (ngModule) {
  ngModule
    .controller('puissance4BoardCtrl', function ($scope,$rootScope,play) {
      $scope.message ="puissance4BoardCtrl here";
      $rootScope.play = play;
    })
    .controller('puissance4InfoCtrl', function ($scope,play) {
      $scope.message ="puissance4InfoCtrl here";
    })
    .controller('puissance4HistoryCtrl', function ($scope,play) {
      $scope.message ="puissance4HistoryCtrl here";
    })
    .controller('puissance4ActionsCtrl', function ($scope,play) {
      $scope.message ="puissance4ActionsCtrl here";
    })
  ;
};
