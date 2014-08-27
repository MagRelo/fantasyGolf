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
    { "teamId" : mongoose.Types.ObjectId("5341acca15183faabc000001"), "provider" : "local", "name" : "Matt Lovan", "email" : "magrelo404@gmail.com", "hashedPassword" : "M1Qx9zFJxx2vpAcmbFU7MQIccBsg9ueAWMVteZ0ZkDONROSHTRkbkHJt2pJtzjxMGyqJxhOl8xEygJoR21uPnA==", "salt" : "0fjBaORTb9knWvQLz0/Cow==", "_id" : mongoose.Types.ObjectId("5341acca15183faabc000002"), "role" : "admin", "__v" : 0 },
    function() {
      console.log('finished populating users');
    }
  );
});

Team.find({}).remove(function() {
  Team.create(
    { "__v" : 0, "_id" : mongoose.Types.ObjectId("5341acca15183faabc000001"), teamName: 'Wildcats', ownerName:'Matt Lovan'},
    function(){
      console.log('finished populating teams');
    }
  );
});

League.find({}).remove(function() {
  console.log('deleted leagues');
});


Tournament.find({}).remove(function() {
  console.log('deleted tourneys');
});

Player.find({}).remove(function() {
  console.log('deleted players');
});




