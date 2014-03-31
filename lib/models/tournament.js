'use strict';
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Tournament Schema
 */
var TournamentSchema = new Schema({
  modified: { type: Date, default: Date.now },
  data: {}
});

TournamentSchema
  .virtual('stablefordScore')
  .get(function() {
    return {
      'score': '6',
      'through': '14'
    };
  });


mongoose.model('Tournament', TournamentSchema);/**
 * Created with JetBrains WebStorm.
 * User: mattlovan
 * Date: 3/31/14
 * Time: 4:04 PM
 * To change this template use File | Settings | File Templates.
 */
