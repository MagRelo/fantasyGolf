'use strict';

var async = require('async');
var request = require('request');
var CronJob = require('cron').CronJob;


var mongoose = require('mongoose'),
  Player = mongoose.model('Player'),
  Tournament = mongoose.model('Tournament'),
  Team = mongoose.model('Team');

//setup tournament
var tournamentSetup = function() {

  //clear existing records
  async.parallel([
    function(callback){
      Tournament.find({}).remove(function(err) {
        if(err)
        console.log('deleted tourneys');
        callback(err);
      });
    },
    function(callback){
      Player.find({}).remove(function(err) {
        console.log('deleted players');
        callback(err);
      });
    },
    function(callback){
      //get setupFile
      request({uri: 'http://www.pgatour.com/data/r/current/setup.json', json: true},
        function(err, response, body) {
          console.log('got setup');
          callback(err, body);
        }
      )
    },
    function(callback){
      //get leaderboard
      request({uri: 'http://www.pgatour.com/data/r/current/leaderboard.json', json: true},
        function(err, response, body) {
          console.log('got leaderboard');
          callback(err, body);
        }
      )
    }
  ],
    function(err, results){
      if(err){return console.log(err);}

      //get data from results array
      var setupFile, leaderboard = {};
      setupFile = results[2];
      leaderboard = results[3];

      //check for tournament object
      if(typeof setupFile.trn === "undefined" || typeof leaderboard.lb.c.c === "undefined"){
        return console.log('tournament setup record retrieved but undefined');
      }

      var setupObj = {
        event: setupFile.trn.event,
        field: setupFile.trn.field,
        rounds: setupFile.trn.rnds,
        courses: leaderboard.lb.c.c
      };

      //save all players
      if(setupObj.field){
        setupObj.field.forEach(function(player){

          //save
          var fieldPlayer = new Player(player);
          fieldPlayer.save(player, function(err){
            if(err){ console.log(err); }
          })

        });
      }

      Tournament.create(setupObj, function(err, item){
        if(err){ return console.log('setup file not saved: ' + err);}
        return console.log('setup record saved: ' + item._id);
      });

    });


};

//refresh all players
var refreshPlayers = function(){

  async.parallel([
    function(callback){
      //get par for courses from setup
      Tournament
        .findOne({})
        .exec(function(err, setup){
          console.log('got setup');
          callback(err, setup);
        });
    },
    function(callback){
      Player
        .find({})
        .exec(function(err, players) {
          console.log('got players');
          callback(err, players);
        });
    }
  ],
    function(err, results){
      if(err){return console.log(err);}

      var setup = results[0];
      var players = results[1];
      if (!players || !setup) {return console.log('no players or courses found');}

      //get array of holes
      var holes = setup.courses[0].h;

      players.forEach(function(player){

        //get scorecard
        request({uri: 'http://www.pgatour.com/data/r/current/scorecards/' + player.id + '.json', json: true},
          function(err, response, body) {
            if(err){return console.log(err);}
            if(typeof body.p.rnds === "undefined"){ return console.log('player record retrieved but undefined'); }
            console.log('player score retrieved: ' + player.id);

            //initialize player obj
            player.rounds = [];
            player.sc = 0;
            player.stable = 0;
            player.modstable = 0;


            //process rounds, push each into player object
            body.p.rnds.forEach(function(round){

              var modStablefordTotal = 0;
              var stablefordTotal = 0;
              var standardTotal = 0;

              //loop through holes
              for(var j = 0 ; j < round.holes.length; j++ ){


                //****
                ///**********

                holes.forEach(function(hole){
                  if(round.holes[j].n == hole.n){
                    round.holes[j].par = hole.p;
                  }
                });

                var par = round.holes[j].par || 4;
                ///**********
                //****

                var score = '';
                score = round.holes[j].sc;
                var modstable = 0;
                var stable = 0;

                if(score == ''){
                  modstable = '--';
                  stable = '--';}
                else{

                  var diff = score - par;

                  //modStable
                  if(diff > 1){modstable = -3}
                  else if (diff == 1 ){modstable = -1}
                  else if (diff == 0 ){modstable = 0}
                  else if (diff == -1){modstable = 2}
                  else if (diff == -2){modstable = 5}
                  else if (diff < -2 ){modstable = 8}

                  //Stable
                  if(diff > 1){stable = 0}
                  else if (diff == 1 ){stable = 1}
                  else if (diff == 0 ){stable = 2}
                  else if (diff == -1){stable = 3}
                  else if (diff == -2){stable = 4}
                  else if (diff == -3){stable = 5}
                  else if (diff >  -3){stable = 6}

                  standardTotal = standardTotal + Number(score);
                  stablefordTotal =  stablefordTotal + stable;
                  modStablefordTotal = modStablefordTotal + modstable;
                }

                round.holes[j].stable =  stable;
                round.holes[j].modstable =  modstable;
              }

              //round totals
              round.sc =  standardTotal;
              round.stable =  stablefordTotal;
              round.modstable = modStablefordTotal;

              //tournament totals
              player.sc +=  standardTotal;
              player.stable +=  stablefordTotal;
              player.modstable += modStablefordTotal;

              player.rounds.push(round)
            });

            player.save(function(err){
              if (err) {return console.log(err);}
              return console.log('player score saved: ' + player.id)
            })
          }
        );
      });


    }
  );

};

//calc Team scores
var calcTeams = function(){

  Team
    .find({})
    .populate('players')
    .exec(function(err, teams){
      if (err) {return console.log(err);}
      if (!teams) {return console.log('calc: did not load teams');}
      console.log('calc: teams: ' + teams.length);

      //called for each team
      async.each(teams,
        function(team, callback){
          team.modstable = 0;
          team.stable = 0;
          team.sc = 0;

          team.players.forEach(function(player){
            team.modstable += player.modstable;
            team.stable += player.stable;
            team.sc += player.sc;
          });

          //de-populate players
          team.players.forEach(function(player, index){
            team.players[index] = player._id;
          });

          team.save(function(err){
              if (err) {return console.log(err);}

              console.log('team saved');
              return callback();
            }
          );
        },

        //after all async ops
        function(err){
          if (err) {return console.log(err);}
          console.log('teams updated');
        })

    });

};


//Setup Tournament - every tuesday midnight
new CronJob('00 00 00 * * 2', function(){
  var now = new Date;
  console.log('setup Tournament begin: ' + now);

  tournamentSetup();

}, null, true);


//Get Players - every 15 minutes
new CronJob('00 00,15,30,45 * * * *', function(){
  console.log('refresh players begin: ' + new Date);

  refreshPlayers();

}, null, true);

//Calc Teams - every 15 minutes
new CronJob('00 05,20,35,50 * * * *', function(){
  console.log('calc teams begin: ' + new Date);

  calcTeams();

}, null, true);


//test
new CronJob('00 * * * * *',
  function(){

    if(process.env.RUN_SETUP){
      console.log('run setup - start time: ' + new Date);
      tournamentSetup();
    }

}, null, true);





