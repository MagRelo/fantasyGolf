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
  players: [],
  player1: {type: String},
  player2: {type: String},
  player3: {type: String},
  player4: {type: String}
});

///**
//*  Validations
//*/
//TeamSchema.schema.path("Team_Name").validate(function (value) {
//  //insert validation here
//}, "Invalid message");


mongoose.model('Team', TeamSchema);