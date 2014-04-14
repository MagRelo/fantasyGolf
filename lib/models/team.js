'use strict';
var mongoose = require('mongoose'),
Schema = mongoose.Schema;

/**
* Team Schema
*/
var TeamSchema = new Schema({
  teamName: {type: String},
  ownerName: {type: String},
  players: [{type: Schema.ObjectId, ref: 'Player'}],
  leagues: [{type: Schema.ObjectId, ref: 'League'}],
  sc: {type: Number},
  stable: {type: Number},
  modstable: {type: Number}
});

mongoose.model('Team', TeamSchema);