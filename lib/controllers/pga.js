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
        return res.send(500, err || 'no setup record found');
      }

      console.log('setup record found');
      return res.send(200, setupRecord)

    });

};


exports.getField = function(req, res) {

  Player
    .find({})
    .exec(function(err, players) {

      if(err || players){
        return res.send(500, err || 'no players found');
      }

      console.log('setup record found');
      return res.send(200, players)

    });

};



exports.getScorecard = function(req, res) {

  var playerId = req.params.playerId;

  Player
    .findOne({id: playerId})
    .exec(function(err, playerRecord) {
      if(err){return res.send(500, err)}

      if(!playerRecord){
        console.log('no player record found');
        return res.send(500, 'no player record found')
      }

      return res.send(200, playerRecord)
    })

};
