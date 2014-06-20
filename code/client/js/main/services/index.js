/*
 * client/js/games/services/index.js
 */
'use strict';
function PlayService(){
  this.play = null;
  this.setPlay = function(play){
    this.play = play;
  };
  this.setState = function(){
  };
  this.addComment = function(){
  };
}
// Public API
exports = module.exports = function (ngModule) {
  ngModule.service('playService',PlayService)
};
