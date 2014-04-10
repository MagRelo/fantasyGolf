'use strict';
//var mongoose = require('mongoose'),
//  Schema = mongoose.Schema,
//  request = require('request');

var request = require('request');
var databaseUrl = "ballstrikers"; // "username:password@example.com/mydb"
var collections = ["tournaments"];
var db = require("mongojs").connect(databaseUrl, collections);


/**
 * Tournament Schema
 */
//var TournamentSchema = new Schema({
//  modified: { type: Date, default: Date.now },
//  event: {},
//  courseInfos: [],
//  field: []
//});
//
///**
// * Register Model
// */
//mongoose.model('Tournament', TournamentSchema);
//var Tournament = mongoose.model('Tournament');

/**
 * Get and Save tournament.js
 */


var tournamentSetup = function() {

  request({uri: 'http://www.pgatour.com/data/r/current/setup.json', json: true},
    function(error, response, body) {
      if(error){ console.log('error1') }

      console.log('setup record retrieved');

      //check for tournament object
      if(typeof body.trn === "undefined"){
        console.log('tournament setup record retrieved but undefined');
      }

      var setupObj = {
        event: body.trn.event,
        courses: body.trn.courseInfos,
        field: body.trn.field,
        rounds: body.trn.rnds
      };

      db.tournaments.save(setupObj,
        function(error, saved){
          if(error || !saved){console.log('setup file not saved: ' + error);}

          console.log('setup record saved');
        });


      //save
//      var setupFile = new Tournament(body.trn);
//      setupFile.save(function(err){
//        if(err){console.log('error2');}
//
//        console.log('setup record saved');
//      })
    }
  )
};

tournamentSetup();
