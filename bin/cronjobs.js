'use strict';
var request = require('request');

var databaseUrl = process.env.MONGOLAB_URI ||
                  process.env.MONGOHQ_URL ||
                  process.env.MODULUS_URL ||
                  'mongodb://localhost/ballstrikers';

var db = require("mongojs").connect(databaseUrl, ["tournaments", "players", "teams"]);

var CronJob = require('cron').CronJob;

var async = require('async');


//setup tournament function

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


//get scorecard
var getScorecard = function(playerId){

  request({uri: 'http://www.pgatour.com/data/r/current/scorecards/' + player.id + '.json', json: true},
    function(error, response, body) {

      //handle errors
      if(error){return console.log(error);}
      if(typeof body.p.rnds === "undefined"){ return console.log('player record retrieved but undefined'); }
      console.log('player score retrieved: ' + player.id);

      //initialize player obj
      player.pgaId =  player.id;
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
          var par = 4;
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

      db.players.save(player,

        function(err){
          if (err) {console.log(err);}
          console.log('player score saved' + player.id)
        })
    }
  );

};

//refresh all players
var refreshPlayers = function(){

  //get par for courses from setup
  var course = [];


  db.players.find().forEach(function(err, player) {
    if (!player) {
      console.log('done with players');
      return;
    }

    //get scorecard
    request({uri: 'http://www.pgatour.com/data/r/current/scorecards/' + player.id + '.json', json: true},
      function(error, response, body) {

        //handle errors
        if(error){return console.log(error);}
        if(typeof body.p.rnds === "undefined"){ return console.log('player record retrieved but undefined'); }
        console.log('player score retrieved: ' + player.id);

        //initialize player obj
        player.pgaId =  player.id;
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
            var par = 4;
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

        db.players.save(player,function(err){
          if (err) {console.log(err);}
          console.log('player score saved: ' + player.id)
        })
      }
    );

  });

}; //refreshPlayers()

//calc Team scores
var calcTeams = function(){

  db.teams
    .find({})
    .populate('players')
    .exec(function(err, teams){
      if (err) {return console.log(err);}
      if (!teams) {return console.log('calc: did not load teams');}

      async.each(teams,

        //called for each team
        function(team, callback){
          var modstableTotal = 0;

          team.players.forEach(function(player){
            modstableTotal += player.modstable;
          });

          db.teams.update({_id: team._id}, {score: modstableTotal}, {},
            function(err){
              if (err) {return console.log(err);}
              console.log('team saved');
              return callback();
            }
          );
        },

        //after all async ops
        function(err){
          if (err) {return console.log(err);}
          return console.log('teams updated');
        })

    });

};



//Setup Tournament - every midnight
new CronJob('00 00 00 * * *', function(){
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
new CronJob('00 * * * * *', function(){
  console.log('calc teams begin: ' + new Date);

  calcTeams();

}, null, true);


//test
//new CronJob('00 00,15,30,45 * * * *', function(){
//  var now = new Date;
//  console.log('test start: ' + now);
//
//  setup();
//
//}, null, true);





