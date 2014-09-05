/*
 * server/sockets/plays.js
 */

'use strict';

function _clientToServer(socket) {
  socket.on('bet-raise-request', function (playId,data) {
    console.log('[%s] %s: %s', socket.address,playId, data);
    socket.broadcast.to(playId).emit('bet-raise-request',data);
  });

  socket.on('join-play-room', function (playId) {
    console.log('%s Joining play room %s', socket.address,playId);
    socket.join(playId);
  });
}

function _serverToClient(socket) {
}

function register(socket) {
  _clientToServer(socket);
  _serverToClient(socket);
}

// Public API
exports.register = register;
