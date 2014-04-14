'use strict';
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Player Schema
 */
var PlayerSchema = new Schema({
  modified: { type: Date, default: Date.now },
  id: {type: String},
  name: {},
  status: {},
  cup: {},
  info: {},
  rounds: {},
  sc: {type: Number},
  stable: {type: Number},
  modstable: {type: Number}

});

mongoose.model('Player', PlayerSchema);