'use strict';
var mongoose = require('mongoose'),
Schema = mongoose.Schema;

/**
* Team Schema
*/
var TeamSchema = new Schema({
  teamName: {type: String},
  ownerName: {type: String},
  player1: {type: Schema.ObjectId, ref: 'Player'},
  player2: {type: Schema.ObjectId, ref: 'Player'},
  player3: {type: Schema.ObjectId, ref: 'Player'},
  player4: {type: Schema.ObjectId, ref: 'Player'},
  leagues: [{type: Schema.ObjectId, ref: 'League'}],
  sc: {type: Number},
  stable: {type: Number},
  modstable: {type: Number},
  newTeam: {type: Boolean, default: true},
  rosterSet: {type: Boolean, default: false}
});

mongoose.model('Team', TeamSchema);