'use strict';
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * League Schema
 */
var LeagueSchema = new Schema({
  ownerUserId: {type: Schema.ObjectId, ref: 'User'},
  leagueName: {type: String},
  location: {type: String},
  teams: [{type: Schema.ObjectId, ref: 'Team'}]
});

LeagueSchema
  .virtual('teamCount')
  .get(function() {
    return this.teams.length || 0;
  });


mongoose.model('League', LeagueSchema);