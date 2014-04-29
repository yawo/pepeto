/*
 * server/models/Game.js
 */

'use strict';
var    ultimate = require('ultimate');
var mongoose = ultimate.lib.mongoose,
    plugin = ultimate.db.mongoose.plugin;


// Schema
var schema = new mongoose.Schema({
  name:         { type: String, required: true },
  description:  { type: String, required: true },
  help:         String,
  displayName:  { type: String, required: true },
  thumbnailUrl: { type: String, required: true},
  popularity:   Number
});

// Restify
schema.restify = {
  'list,get': '*',
  'post,put,delete': {
    'admin': '*'
  }
};

// Indexes
schema.path('name').index({ unique: true });

// Plugins
schema.plugin(plugin.findOrCreate);
schema.plugin(plugin.timestamp);

// Model
var model = mongoose.model('Game', schema);

// Public API
exports = module.exports = model;
