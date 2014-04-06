'use strict';
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Player Schema
 */
var PlayerSchema = new Schema({
  modified: { type: Date, default: Date.now },
  pgaId: {type: String},
  rounds: {},
  sc: {type: Number},
  stable: {type: Number},
  modstable: {type: Number}

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