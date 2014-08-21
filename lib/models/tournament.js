'use strict';
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Tournament Schema
 */
var TournamentSchema = new Schema({
  modified: { type: Date, default: Date.now },
  event: {},
  courses: [],
  field: [],
  name: {type: String},
  date: {type: String},
  status: {type: String},
  fedex: {},
  money: {},
  history: {}
});


mongoose.model('Tournament', TournamentSchema);


