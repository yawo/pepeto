/*
 * client/js/main/controllers/home.js
 */

'use strict';

exports = module.exports = function (ngModule) {
  ngModule
  .controller('GameCtrl', function ($scope, $rootScope, $stateParams,  plays) {
      $scope.plays = plays;
      $scope.gameId = $stateParams.gameId;
    })
    .controller('GameHeaderCtrl', function ($scope, $rootScope, $stateParams, play) {
      var elementPlayCountdown = document.querySelector('#play-countdown');
      $rootScope.play = play;
      $rootScope.gameId = $stateParams.gameId;
      //console.log($rootScope.play);
      if($rootScope.play.state === $scope.config.playStates.CREATED){
        $rootScope.me = 0;
        $rootScope.currentPlayer = $rootScope.me;
        $rootScope.play.state = $scope.config.playStates.WAITING;
        $rootScope.play.put();
      }else{
        $rootScope.me = 1;
        $rootScope.currentPlayer = 1 - $rootScope.me;
        //console.log($rootScope.play);
        $rootScope.play.players.push($rootScope.play.players[0]);
        $rootScope.play.put();
      }
      $scope.startPauseClass    = ['glyphicon glyphicon-play','glyphicon glyphicon-pause'];
      $scope.startBtnPauseClass = ['btn-xs btn btn-primary','btn-xs btn btn-warning'];
      $scope.timerRunning = true;
      //$scope.bet = 1000;
      $rootScope.playing = 1;

      $scope.startTimer = function (){
        $scope.$broadcast('timer-start');
        $scope.timerRunning = true;
      };

      $scope.stopTimer = function (){
        $scope.$broadcast('timer-stop');
        $scope.timerRunning = false;
      };

      $scope.$on('timer-stopped', function (event, data){
        //console.log('Timer Stopped - event/data = ', event, data);
        //console.log('event.targetScope.countdown',event.currentScope);
        if(event.targetScope.countdown === 0){
          $scope.$emit('next-player');
        }
      });

      $scope.$on('next-player', function (event, data){
        $rootScope.currentPlayer = 1- $rootScope.currentPlayer;
        elementPlayCountdown.start();
        $scope.$apply();
      });

      $scope.startPausePlay = function(){
        $rootScope.playing = 1 - $rootScope.playing;
        if($rootScope.playing){
          elementPlayCountdown.start();
        }else{
          elementPlayCountdown.stop();
        }
      };
    })
  .controller('DiscussionsCtrl', function ($scope, $rootScope, play) {
      var elementDiscussion =  document.querySelector('#discussions .dtable');
      $scope.message = null;
      /*$scope.discussions = [
        {author:'Toto', message:'test message'},
        {author:'Marcel', message:'How u doing dudes'},
        {author:'John', message:'Quick bro, aint have all the day'}
      ];*/
      $scope.sendMessage = function(){
        $rootScope.play.comments.push({user:$rootScope.play.players[$rootScope.me]._id, text: $scope.message});
        $scope.message=null;
        elementDiscussion.scrollTop = elementDiscussion.scrollHeight-10;
        $rootScope.play.put();
      };
    })
  ;
};
