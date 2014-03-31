'use strict';
var mongoose = require('mongoose'),
Schema = mongoose.Schema;

/**
* Team Schema
*/
var TeamSchema = new Schema({
  userId: {type: Schema.ObjectId, ref: 'User'},
  teamName: {type: String},
  ownerName: {type: String},
  leagues: [{type: Schema.ObjectId, ref: 'League'}],
  players: [{type: Schema.ObjectId, ref: 'Player'}]
});

///**
//*  Validations
//*/
//TeamSchema.schema.path("Team_Name").validate(function (value) {
//  //insert validation here
//}, "Invalid message");


mongoose.model('Team', TeamSchema);