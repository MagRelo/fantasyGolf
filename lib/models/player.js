'use strict';
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Player Schema
 */
var PlayerSchema = new Schema({
  modified: { type: Date, default: Date.now },
  data: {}
});

PlayerSchema
  .virtual('stablefordScore')
  .get(function() {
    return {
      'score': '6',
      'through': '14'
    };
  });


mongoose.model('Player', PlayerSchema);