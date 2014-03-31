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

TournamentSchema
  .virtual('stablefordScore')
  .get(function() {
    return {
      'score': '6',
      'through': '14'
    };
  });


mongoose.model('Tournament', TournamentSchema);


