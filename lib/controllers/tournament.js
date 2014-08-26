var mongoose = require('mongoose'),
  Tournament = mongoose.model('Tournament'),
  Player = mongoose.model('Player'),
  request = require('request');




exports.updateTournament = function(req, res) {

  Tournament.findById(req.body._id, function(err, tournament){

    if (err) { res.send(500, err); }
    if (!tournament) { res.send(500, 'Failed to load tournament ' + req.body._id); }

    tournament.ballstrikersStatus = req.body.ballstrikersStatus;

    tournament.save(function(err) {
      if (err) {res.send(500, err);}
      else {

        Tournament
          .findOne({_id: tournament._id})
          .exec(function(err, tournament){
            if (err) {return res.json(500, err);}
            if (!tournament) {return res.json(400, 'did not load tournament ' + tournament._id);}
            res.send(200, tournament);
          });
      }
    });

  });

};



