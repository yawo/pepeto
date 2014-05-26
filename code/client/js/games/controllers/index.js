/*
 * client/js/main/controllers/home.js
 */

'use strict';

exports = module.exports = function (ngModule) {
  ngModule
    .controller('DiscussionsCtrl', function ($scope, play) {
      var elementDiscussion =  document.querySelector('#discussions .dtable');
      $scope.message = null;
      /*$scope.discussions = [
        {author:'Toto', message:'test message'},
        {author:'Marcel', message:'How u doing dudes'},
        {author:'John', message:'Quick bro, aint have all the day'}
      ];*/
      $scope.sendMessage = function(){
        $scope.play.comments.push({user:$scope.play.players[$scope.me]._id, text: $scope.message});
        $scope.message=null;
        elementDiscussion.scrollTop = elementDiscussion.scrollHeight-10;
      };
    })
    .controller('GameHeaderCtrl', function ($scope, $rootScope, $stateParams, play) {
      var elementPlayCountdown = document.querySelector('#play-countdown');
      $rootScope.play = play;
      if(play.state === $scope.config.playStates.CREATED){
        $rootScope.me = 0;
        play.state = $scope.config.playStates.WAITING;
      }else{
        $rootScope.me = 1;
      }
      $scope.startPauseClass    = ['glyphicon glyphicon-play','glyphicon glyphicon-pause'];
      $scope.startBtnPauseClass = ['btn-xs btn btn-primary','btn-xs btn btn-warning'];
      $scope.timerRunning = true;
      /*$scope.bet = 1000;
      $scope.currentPlayer = $scope.me;
      $scope.playing = 1;
      */


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
        $scope.currentPlayer = 1- $scope.currentPlayer;
        elementPlayCountdown.start();
        $scope.$apply();
      });

      $scope.startPausePlay = function(){
        $scope.playing = 1 - $scope.playing;
        if($scope.playing){
          elementPlayCountdown.start();
        }else{
          elementPlayCountdown.stop();
        }
      };
    });

};
