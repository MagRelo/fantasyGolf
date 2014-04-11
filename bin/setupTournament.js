'use strict';
var request = require('request');
var databaseUrl = process.env.MONGOHQ_URL || "ballstrikers"; // heroku MongoHQ || local default
var collections = ["tournaments"];
var db = require("mongojs").connect(databaseUrl, collections);

/**
 * Get and Save tournament.js
 */
var tournamentSetup = function() {

  request({uri: 'http://www.pgatour.com/data/r/current/setup.json', json: true},
    function(error, response, body) {
      if(error){
        console.log(error);
        return;
      }

      console.log('setup record retrieved');

      //check for tournament object
      if(typeof body.trn === "undefined"){
        console.log('tournament setup record retrieved but undefined');
        return;
      }

      var setupObj = {
        event: body.trn.event,
        courses: body.trn.courseInfos,
        field: body.trn.field,
        rounds: body.trn.rnds
      };

      db.tournaments.save(setupObj,
        function(error, saved){
          if(error || !saved){
            console.log('setup file not saved: ' + error);
            return;
          }

          console.log('setup record saved: ' + saved);
          return;
        });

    }
  )
};

tournamentSetup();
