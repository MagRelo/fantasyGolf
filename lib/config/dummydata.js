'use strict';

var mongoose = require('mongoose'),
  League = mongoose.model('League'),
  User = mongoose.model('User'),
  Thing = mongoose.model('Thing');

/**
 * Populate database with sample application data
 */

//Clear old things, then add things in
Thing.find({}).remove(function() {
  Thing.create({
    name : 'HTML5 Boilerplate',
    info : 'HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.',
    awesomeness: 10
  }, {
    name : 'AngularJS',
    info : 'AngularJS is a toolset for building the framework most suited to your application development.',
    awesomeness: 10
  }, {
    name : 'Karma',
    info : 'Spectacular Test Runner for JavaScript.',
    awesomeness: 10
  }, {
    name : 'Express',
    info : 'Flexible and minimalist web application framework for node.js.',
    awesomeness: 10
  }, {
    name : 'MongoDB + Mongoose',
    info : 'An excellent document database. Combined with Mongoose to simplify adding validation and business logic.',
    awesomeness: 10
  }, function() {
      console.log('finished populating things');
    }
  );
});

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