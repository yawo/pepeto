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
  //console.log($rootScope.play);
  .controller('GameHeaderCtrl', function ($scope, $rootScope,$state, $stateParams, play, prompt, $modal) {
      var elementPlayCountdown = document.querySelector('#play-countdown');
      var waitingForOpponentModal;
      //// Initialize
      $scope.startPauseClass    = ['glyphicon glyphicon-play','glyphicon glyphicon-pause'];
      $scope.startBtnPauseClass = ['btn-xs btn btn-primary','btn-xs btn btn-warning'];
      $rootScope.playing = 0;
      $scope.timerRunning = false;

      $rootScope.play = play;
      $rootScope.gameId = $stateParams.gameId;

      if($rootScope.play.state === $scope.config.playStates.CREATED){
        $rootScope.me = 0;
        $rootScope.currentPlayer = $rootScope.me;
        $rootScope.play.put();
      }else{
        $rootScope.me = 1;
        $rootScope.currentPlayer = 1 - $rootScope.me;
        $rootScope.play.players.push($rootScope.play.players[0]);
        $rootScope.play.put();
      }

      //// Actions

      $scope.requestBetRaise = function(){
        if($rootScope.play.state === $scope.config.playStates.CREATED){
          $scope.$emit('bet-raise-request');
          console.log("socket = ",$scope.socket);
          $scope.socket.emit("bet-raise-request",$rootScope.play._id,$rootScope.play.bet);
        }else{
          $scope.socket.emit("bet-raise-request",$rootScope.play._id,$rootScope.play.bet);
        }
      };

      $scope.startPausePlay = function(){
        switch($rootScope.play.state){
          case $scope.config.playStates.CREATED :
            //On a new game
            $rootScope.play.state = $scope.config.playStates.WAITING;
            $rootScope.play.put();
            waitingForOpponentModal = $modal.open({
              template: ' <div class="msg">Please wait for an opponent to join ...<br/>'+
                '   <img src="/img/spinner.gif"> <br/>'+
                '   <button class="btn btn-warning" ng-click="cancel()">Abort</button>'+
                ' </div>',
              keyboard: false,
              backdrop: false,
              windowClass: 'waiting-for-opponent-modal',
              controller: function ($scope, $modalInstance) {
                $scope.ok = function () {
                  $modalInstance.close('close');
                  console.log('modal closed');
                };

                $scope.cancel = function () {
                  $modalInstance.dismiss('cancel');
                  console.log('modal cancelled');
                  $rootScope.play.remove();
                  $state.go('app.home');
                };
              }
            });
            break;
          case $scope.config.playStates.PLAYING :
          case $scope.config.playStates.PAUSED :
            //on a running game
            $rootScope.playing = 1 - $rootScope.playing;
            if($rootScope.playing){
              elementplaycountdown.start();
            }else{
              elementPlayCountdown.stop();
            }
            break;
          default:
            //Other states
            break;
        }
      };

      $scope.raiseBet = function(){
        if($rootScope.play.bet === 0){
          $rootScope.play.bet = 25;
        }else{
          $rootScope.play.bet *= 2;
        }
        $rootScope.play.put();
      };

      $scope.startTimer = function (){
        $scope.$broadcast('timer-start');
        $scope.timerRunning = true;
      };


      $scope.stopTimer = function (){
        $scope.$broadcast('timer-stop');
        $scope.timerRunning = false;
      };

      //// Socket.io Events
      $scope.socket.emit("join-play-room",$rootScope.play._id);

      $scope.socket.on("bet-raise-request",function(data){
        console.log("bet-raise-request event",data);
      });

      //// Angular Events
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

      $scope.$on('bet-raise-request', function(event, data){
        prompt({
          title: 'Raising the Bet',
          message: 'Double the current bet ?'
        }).then(function(){
          $scope.raiseBet();
        });
      });
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
