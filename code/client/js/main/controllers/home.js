/*
 * client/js/main/controllers/home.js
 */

'use strict';

exports = module.exports = function (ngModule) {
  ngModule.controller('HomeCtrl', function ($scope, games) {
    $scope.items = games;
  });
};
