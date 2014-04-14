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

User.find({}).remove(function() {
  User.create(
    { "teamId" : mongoose.Types.ObjectId("5341acca15183faabc000001"), "provider" : "local", "name" : "nick@aol.com", "email" : "nick@aol.com", "hashedPassword" : "M1Qx9zFJxx2vpAcmbFU7MQIccBsg9ueAWMVteZ0ZkDONROSHTRkbkHJt2pJtzjxMGyqJxhOl8xEygJoR21uPnA==", "salt" : "0fjBaORTb9knWvQLz0/Cow==", "_id" : mongoose.Types.ObjectId("5341acca15183faabc000002"), "role" : "user", "__v" : 0 },
    function() {
      console.log('finished populating users');
    }
  );
});

Team.find({}).remove(function() {
  Team.create(
    { "__v" : 0, "_id" : mongoose.Types.ObjectId("5341acca15183faabc000001"), teamName: 'Wildcats', ownerName:'Nick Offerman', "players" : [ ] },
    function(){
      console.log('finished populating teams');
    }
  );
});

League.find({}).remove(function() {
  League.create([
    { "leagueName" : "First", "location" : "Boise", "_id" : mongoose.Types.ObjectId("5341ae4315183faabc000008"), "teams" : [  mongoose.Types.ObjectId("5341acca15183faabc000001") ], "__v" : 0 } ,
    { "leagueName" : "Second", "location" : "Portland", "_id" : mongoose.Types.ObjectId("5341ae5315183faabc000009"), "teams" : [  mongoose.Types.ObjectId("5341acca15183faabc000001") ], "__v" : 0 }],
    function() {
      console.log('finished populating leagues');
  });
});



Tournament.find({}).remove(function() {
  console.log('deleted tourneys');
});

Player.find({}).remove(function() {
  console.log('deleted players');
});




