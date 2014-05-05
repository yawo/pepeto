/*
 * server/models/Play.js
 */

'use strict';
var ultimate = require('ultimate');
var mongoose = ultimate.lib.mongoose,
  Schema = mongoose.Schema,
  plugin = ultimate.db.mongoose.plugin;

var playStates = {
  CREATED: 0,
  WAITING: 1,
  PLAYING: 2,
  PAUSED: 3,
  CANCELED: 4,
  DRAWED: 5,
  OVER: 6,
  TIMEDOUT: 7,
  BUGGY: 8,
  OTHER: 9,
  UNKNOWN: 10
};


// Schema
var schema = new Schema({
  game: { type: Schema.Types.ObjectId, ref: 'Game' },
  state: { type: Number, default: playStates.CREATED },
  players: [
    { type: Schema.Types.ObjectId, ref: 'User' }
  ],
  startTime: { type: Date, default: Date.now },
  endTime: Date,
  history: [
    {
      playerId: Number,
      move: Schema.Types.Mixed
    }
  ],
  data: Schema.Types.Mixed,
  winnerIndex: Number,
  comments: [
    {
      user: { type: Schema.Types.ObjectId, ref: 'User' },
      text: String
    }
  ]
});

// Restify
schema.restify = {
  'list,get,post,put': '*',
  'delete': {
    'admin': '*'
  }
};

// Indexes
schema.path('game').index();
schema.path('players').index();
//schema.path('state').index();
//schema.path('endTime').index();

// Plugins
schema.plugin(plugin.findOrCreate);
schema.plugin(plugin.timestamp);

/*
 //Life Cycle
 schema.post('save',function getEngine(){
 this.engine = require(this.enginePath);
 });

 //Play Functionnalities
 schema.methods.initPlay = function () {
 var play = this;

 };
 */

//Statics
schema.statics.playStates = playStates;
// Model
var model = mongoose.model('Play', schema);

// Public API
exports = module.exports = model;
