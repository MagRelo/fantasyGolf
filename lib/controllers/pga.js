var mongoose = require('mongoose'),
  Tournament = mongoose.model('Tournament'),
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

  //*** 1. search for file in db within 24 hours
  var fileExpiredDate = new Date();
  fileExpiredDate.setDate(fileExpiredDate.getDate() - 1);

  Tournament.findOne({modified: {$gte: fileExpiredDate}},
    function(err, setupFile) {
      if(err){res.send(500, err)}

      //*** 1. File Found
      if(setupFile){
        console.log('setup file found');
        res.send(200, setupFile)
      }

      //*** 2. No file found
      if(!setupFile){
        console.log('no setup file found');

        request({uri: 'http://www.pgatour.com/data/r/current/setup.json', json: true},
          function(error, response, body) {

            if(error){return res.json(500, error);}
            console.log('setup file retrieved');

            //check for tourney object
            if(typeof body.trn === "undefined"){
              if(error){return res.json(500, 'tournament setup file retrieved but undefined');}
            }

            //save file
            var setupFile = new Tournament(body.trn);
            setupFile.save(function(err){

              if(err){return res.json(500, err);}
              console.log('setup file saved');

              res.send(200, setupFile)

            })
          }
        )
      }

  });

};

exports.getScorecard = function(req, res) {

  //    var playerID = req.params.playerID;
  //    var scorecardURLString = 'http://www.pgatour.com/data/r/current/scorecards/' + playerID + '.json';
  //
  //    request(scorecardURLString, function(error, response, body) {
  //            console.log('scorecard: ' + scorecardURLString);
  //            res.send(body)
  //        }
  //    )

};
