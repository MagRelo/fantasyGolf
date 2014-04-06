'use strict';
var mongoose = require('mongoose'),
Schema = mongoose.Schema;

/**
* Team Schema
*/
var TeamSchema = new Schema({
  teamName: {type: String},
  ownerName: {type: String},
  players: [],
  leagues: [{type: Schema.ObjectId, ref: 'League'}],
  sc: {type: String},
  stable: {type: String},
  modstable: {type: String}
});

mongoose.model('Team', TeamSchema);