'use strict';
var request = require('request');

var databaseUrl = process.env.MONGOLAB_URI ||
                  process.env.MONGOHQ_URL ||
                  process.env.MODULUS_URL ||
                  'mongodb://localhost/ballstrikers';

var collections = ["tournaments", "players"];
var db = require("mongojs").connect(databaseUrl, collections);


var async = require('async');

/**
 * Get and Save tournament.js
 */
var tournamentSetup = function() {

  //clear existing records
  async.parallel([
      function(callback){
        db.tournaments.remove({}, false, callback)
      },
      function(callback){
        db.players.remove({}, false, callback)
      }
    ],
    function(err){
      if(err){ console.log(err); return; }

      //get setupFile
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

          //save all players
          if(setupObj.field){
            setupObj.field.forEach(function(player){

              //save
              db.players.save(player, function(err){
                if(err){ console.log(err); }
              })

            });
          }

          db.tournaments.save(setupObj,
            function(error, saved){
              if(error || !saved){
                console.log('setup file not saved: ' + error);
                return;
              }

              console.log('setup record saved: ' + saved._id);
            });

        }
      )


    });


};

tournamentSetup();
