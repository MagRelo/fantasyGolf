var mongoose = require('mongoose'),
    Tournament = mongoose.model('Tournament'),
    Player = mongoose.model('Player'),
    request = require('request');



//PGA datafiles
exports.leaderboard = function(req, res) {

  //

  request({uri: 'http://www.pgatour.com/data/r/current/leaderboard.json', json: true}
    ,function(error, response, body) {

      if(error){res.send(400, error)}

      var tourney = {
        info: {
          name: body.lb.tn,
          date: body.lb.sd
        },
        courses: body.lb.c.c,
        players: body.lb.pds.p
      };

      res.send(tourney);

    }
  );
};

exports.tournamentSetup = function(req, res) {

  Tournament
    .findOne({})
    .sort({modified: -1})
    .exec(function(err, setupRecord) {

      if(err || !setupRecord){
        res.send(500, err || 'no setup record found');
        return;
      }

      console.log('setup record found');
      res.send(200, setupRecord)

    });

};

exports.getScorecard = function(req, res) {

  var playerId = req.params.playerId;

  //*** 1. search for record created within 30 min
  var ageLimit = new Date();
  ageLimit.setMinutes(ageLimit.getMinutes() - 30);    

  Player.findOne({modified: {$gte: ageLimit}, pgaId: playerId},
    function(err, playerRecord) {
      if(err){res.send(500, err)}

      //*** 1. record found
      if(playerRecord){
        console.log('player record found');
        res.send(200, playerRecord)
      }

      //*** 2. No record found
      if(!playerRecord){
        console.log('no player record found');

        request({uri: 'http://www.pgatour.com/data/r/current/scorecards/' + playerId + '.json', json: true},
          function(error, response, body) {

            //errors
            if(error){return res.json(500, error);}
            if(typeof body.p.rnds === "undefined"){ return res.json(500, 'player record retrieved but undefined'); }
            console.log('player record retrieved: ' + playerId);

            //initialize player obj
            var playerObj = {
              pgaId: playerId,
              rounds: [],
              sc: 0,
              stable: 0,
              modstable: 0
          };

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
              playerObj.sc +=  standardTotal;
              playerObj.stable +=  stablefordTotal;
              playerObj.modstable += modStablefordTotal;

              playerObj.rounds.push(round)
            });

            //save file
            var player = new Player(playerObj);
            player.save(function(err){

              if(err){return res.json(500, err);}
              console.log('player record saved');

              res.send(200, player)

            })
          }
        )
      }

    });

};
