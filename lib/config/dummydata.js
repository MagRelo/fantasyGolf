'use strict';

var mongoose = require('mongoose'),
  League = mongoose.model('League'),
  User = mongoose.model('User');

/**
 * Populate database with sample application data
 */

// Clear old users, then add a default user
User.find({}).remove(function() {
  User.create({
      provider: 'local',
      name: 'Matt',
      email: 'matt@aol.com',
      password: 'asdf'
    }, function() {
      console.log('finished populating users');
    }
  );
});


//Clear old things, then add things in
League.find({}).remove(function() {
  League.create({
      leagueName: 'America\'s Best',
      private: false
    },{
      leagueName: 'Idaho Potatoes',
      private: false
    },{
      leagueName: 'Oregon Ducks',
      private: false
    },{
      leagueName: 'Southern Gentlemen',
      private: false
    }, function() {
      console.log('finished populating leagues');
    }
  );
});