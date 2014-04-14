'use strict';
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Tournament Schema
 */
var TournamentSchema = new Schema({
  modified: { type: Date, default: Date.now },
  event: {},
  courseInfos: [],
  field: []
});


mongoose.model('Tournament', TournamentSchema);


