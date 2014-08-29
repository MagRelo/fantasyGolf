'use strict';
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * League Schema
 */
var LeagueSchema = new Schema({
  modified: { type: Date, default: Date.now },
  ownerUserId: {type: Schema.ObjectId, ref: 'User'},
  leagueName: {type: String},
  location: {type: String},
  teams: [{type: Schema.ObjectId, ref: 'Team'}],
  leaderboard: [
    {teamName: {type: String},
     ownerName: {type: String},
     teamId: {type: String},
     score: {type: String}
    }
  ],
  chat: [
    {user: {type: Schema.ObjectId, ref: 'User'},
     name: {type: String},
     modified: { type: Date, default: Date.now},
     message:{type: String}
    }
  ]
});

LeagueSchema
  .virtual('teamCount')
  .get(function() {
    return this.teams.length || 0;
  });


mongoose.model('League', LeagueSchema);