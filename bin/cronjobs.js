'use strict';

var async = require('async');
var request = require('request');
var CronJob = require('cron').CronJob;


var mongoose = require('mongoose'),
  Player = mongoose.model('Player'),
  Tournament = mongoose.model('Tournament'),
  Team = mongoose.model('Team'),
  League = mongoose.model('League');

//helper functions
var sumPlayerScores = function(playerArray){

  var teamScores = {
    modstable: 0,
    stable: 0,
    sc: 0
  };

  playerArray.forEach(function(player){
    if(player){
      teamScores.modstable += player.modstable;
      teamScores.stable += player.stable;
      teamScores.sc += player.sc;
    }
  });

  return teamScores;
};
var flattenObject = function(item){
  if(item){
    item = item._id;
  }
  return item;
};


var refreshSetup = function(){

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
      if(err){console.log(err); }

      //get data from results array
      var setupFile, leaderboard = {};
      setupFile = results[1];
      leaderboard = results[2];

      //check for tournament object
      if(typeof setupFile.trn === "undefined" || typeof leaderboard.lb.c.c === "undefined"){

        return console.log('tournament setup record retrieved but undefined');
        //return res.json(500, 'tournament setup record retrieved but undefined');
      }

      var setupObj = {
        event: setupFile.trn.event,
        field: setupFile.trn.field,
        rounds: setupFile.trn.rnds,
        courses: leaderboard.lb.c.c,

        name: leaderboard.lb.tn,
        date: leaderboard.lb.lt,
        pgaStatus: leaderboard.lb.rs,
        ballstrikersStatus: 'Editable',
        totalRounds: setupFile.trn.event.totalRnds,
        currentRound: setupFile.trn.event.currentRnd,

        fedex: setupFile.trn.event.cup,
        money: setupFile.trn.event.money,
        history: setupFile.trn.event.hiestory
      };

      Tournament.create(setupObj, function(err){
        if(err){
          console.log('setup file not saved: ' + err);
          //return res.json(500, 'setup file not saved: ' + err);
        }
        console.log('tournament setup file saved');
        //return res.send(200, 'setup record saved: ' + item._id);
      });

    });

};

var refreshPlayerScores = function(callback){

  console.log('Updating players...');

  async.parallel([
      function(callback){
        //get par for courses from setup
        Tournament
          .findOne({})
          .exec(function(err, setup){
            callback(err, setup);
          });
      },
      function(callback){
        Player
          .find({})
          .exec(function(err, players) {
            callback(err, players);
          });
      }
    ],
    function(err, results){
      if(err){ return console.log(err);}

      //assign data returned from http calls
      var setup = results[0];
      var players = results[1];
      if (!players || !setup) { return console.log('no players or courses found'); }

      //get array of holes
      var scorecardTemplate = setup.courses[0].h;
      // --- this should select the appropriate course?

      async.each(players, function(player, callback) {

        //initialize player obj
        player.rounds = [];
        player.sc = 0;
        player.stable = 0;
        player.modstable = 0;


        //get scorecard
        request({uri: 'http://www.pgatour.com/data/r/current/scorecards/' + player.id + '.json', json: true},
          function(err, response, body) {
            if(err){ return console.log(err); }
            if(typeof body.p.rnds === "undefined"){ return console.log('player record retrieved but undefined'); }

            //process each round
            body.p.rnds.forEach(function(rawRound){

              var scorecard = JSON.parse(JSON.stringify(scorecardTemplate));

              //create a template to push into the player
              var processedRound = {
                modStablefordTotal: 0,
                stablefordTotal: 0,
                standardTotal: 0,
                holes: scorecard
              };

              processedRound.holes.forEach(function(processedHole, pHoleIndex){

                processedHole.score = '';
                processedHole.modstable = 0;
                processedHole.stable = 0;

                //loop through raw hole to find hole number that matches
                rawRound.holes.forEach(function(rawHole){

                  if(rawHole.cNum === processedHole.n) {

                    //set score
                    processedHole.score = rawHole.sc;

                    //if blank, set all to '-' for consistent display
                    if(processedHole.score ===  ''){
                      processedHole.score = '-';
                      processedHole.modstable = '-';
                      processedHole.stable = '-';}
                    else{

                      var diff = processedHole.score - processedHole.p;

                      //modStable
                      if(diff > 1){processedHole.modstable = -3}
                      else if (diff === 1){processedHole.modstable = -1}
                      else if (diff === 0){processedHole.modstable = 0}
                      else if (diff === -1){processedHole.modstable = 2}
                      else if (diff === -2){processedHole.modstable = 5}
                      else if (diff < -2 ){processedHole.modstable = 8}

                      //Stable
                      if(diff > 1){processedHole.stable = 0}
                      else if (diff === 1 ){processedHole.stable = 1}
                      else if (diff === 0 ){processedHole.stable = 2}
                      else if (diff === -1){processedHole.stable = 3}
                      else if (diff === -2){processedHole.stable = 4}
                      else if (diff === -3){processedHole.stable = 5}
                      else if (diff >  -3){processedHole.stable = 6}

                      processedRound.standardTotal += Number(processedHole.score);
                      processedRound.stablefordTotal += processedHole.stable;
                      processedRound.modStablefordTotal += processedHole.modstable;
                    }

                  }//if hole numbers match

                }); //raw.forEach loop

                processedRound.holes[pHoleIndex] = processedHole;

              }); // Each processedHole

              //tournament totals
              player.sc +=  processedRound.standardTotal ;
              player.stable +=  processedRound.stablefordTotal;
              player.modstable += processedRound.modStablefordTotal;

              player.rounds.push(processedRound)

            }); //each round

            player.save(function(err){
              if (err) { return console.log('player: ' + player.id + ' -- ' + err); }
              return callback();
            })
          }
        );

      }, function(err){
        if( err ) {
          console.log('error processing player scores: ' + err);
        } else {
          console.log('...all players updated');
          callback();
        }
      });


    }
  );

};

var refreshTeamScores = function(callback){

  console.log('Updating teams...');

  Team
    .find({})
    .populate('player1')
    .populate('player2')
    .populate('player3')
    .populate('player4')
    .exec(function(err, teams){
      if (err) {return console.log(err);}
      if (!teams) {return console.log('calc: did not load teams');}

      //called for each team
      async.each(teams,
        function(team, callback){
          team.modstable = 0;
          team.stable = 0;
          team.sc = 0;

          var teamScores = sumPlayerScores([team.player1, team.player2, team.player3, team.player4]);
          team.modstable = teamScores.modstable;
          team.stable = teamScores.stable;
          team.sc = teamScores.sc;

          team.player1 = flattenObject(team.player1);
          team.player2 = flattenObject(team.player2);
          team.player3 = flattenObject(team.player3);
          team.player4 = flattenObject(team.player4);

          team.save(function(err){
              if (err) { console.log(err); }
              return callback();
            }
          );
        },

        //after all async ops
        function(err){
          if (err) { console.log(err); }
          console.log('... all teams updated');
          callback();
        })

    });

};

var refreshLeagueScores = function(callback){

  console.log('Updating leagues...');

  League
    .find({})
    .populate('teams')
    .exec(function(err, leagues){
      if (err) {return console.log(err);}
      if (!leagues) {return console.log('calc: did not load teams');}

      //called for each league
      async.each(leagues,
        function(league, callback){

          league.leaderboard = [];
          league.teams.forEach(function(team){

            league.leaderboard.push({
              teamName: team.teamName,
              ownerName: team.ownerName,
              teamId: team._id,
              score: team.modstable
            });
          });

          league.save(function(err){
              if (err) { console.log(err); }
              return callback();
            }
          );
        },

        //after all async ops
        function(err){
          if (err) { console.log(err); }
          console.log('... all leagues Updated');
          callback();
        })

    });

};



//test
new CronJob('00 00,15,30,45 * * * *', function(){

    var refresh = process.env.RUN_REFRESH || 'true';

    console.log('Run Refresh? ' + refresh);
    if(refresh === 'true'){
      console.log('refresh start time: ' + new Date);

      async.series([
          function(callback){
            refreshPlayerScores(callback);
          },
          function(callback){
            refreshTeamScores(callback);
          },
          function(callback){
            refreshLeagueScores(callback);
          }
        ],
        function(err){
          if (err) {return console.log(err);}
          console.log('refresh complete: ' + new Date);
        })

    }

}, null, true);





