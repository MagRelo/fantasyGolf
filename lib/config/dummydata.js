'use strict';

var mongoose = require('mongoose'),
  League = mongoose.model('League'),
  Team = mongoose.model('Team'),
  Tournament = mongoose.model('Tournament'),
  Player = mongoose.model('Player'),
  User = mongoose.model('User');

/**
 * Populate database with sample application data
 */
League.find({}).remove(function() {
  console.log('deleted players');
});

Team.find({}).remove(function() {
  console.log('deleted teams');
});

Tournament.find({}).remove(function() {
  console.log('deleted tourneys');
});

Player.find({}).remove(function() {
  console.log('deleted players');
});

User.find({}).remove(function() {
  console.log('deleted user');
});


// Clear old users, then add a default user
//User.find({}).remove(function() {
//  User.create({
//      provider: 'local',
//      name: 'Matt',
//      email: 'matt@aol.com',
//      password: 'asdf'
//    }, function() {
//      console.log('finished populating users');
//    }
//  );
//});

