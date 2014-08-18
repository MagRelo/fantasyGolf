var mongoose = require('mongoose'),
  Team = mongoose.model('Team'),
  User = mongoose.model('User'),
  Player = mongoose.model('Player'),
  passport = require('passport');


/**
 * Create Team
 */
exports.createTeam = function (req, res) {

  var response = {};

  var newTeam = new Team(req.body);
  newTeam.save(function(err) {
    if (err) { return res.json(400, err); }

    //find user record and add team
    User.findById(newTeam.userId, function(err, user){
      if (err) { return res.json(500, err); }
      if (!user) { return res.json(400, 'could not find user ' + newTeam.userId); }

      user.teamId = newTeam._id;

      user.save(function(err){
        if (err) { return res.json(400, err); }
      });


      //set response
      response.team = req.body;
      response.teamId = user.teamId;

      res.json(200, response);

    });

  });
};

/**
 * Get Team
 */
exports.getTeam = function (req, res, next, id){

  Team
    .findOne({_id: id})
    .populate('players')
    .exec(function(err, team){
      if (err) {return res.json(500, err);}
      if (!team) {return res.json(400, 'did not load team ' + id);}

      req.team = team;
      next();
    });

};

/**
 * Show Team
 */
exports.showTeam = function(req, res){
  res.jsonp(req.team);
};

/**
 * Update Team
 */
exports.updateTeam = function(req, res) {

  Team.findById(req.team._id, function(err, team){

    if (err) { res.send(500, err); }
    if (!team) { res.send(500, 'Failed to load team ' + req.team._id); }

    team.ownerName = req.body.ownerName;
    team.teamName = req.body.teamName;
    team.player1 = req.body.player1;
    team.player2 = req.body.player2;
    team.player3 = req.body.player3;
    team.player4 = req.body.player4;

    team.save(function(err) {
      if (err) {res.send(500, err);}
      else {

        Team
          .findOne({_id: team._id})
          .populate('leagues')
          .populate('players')
          .exec(function(err, team){
            if (err) {return res.json(500, err);}
            if (!team) {return res.json(400, 'did not load team ' + team._id);}
              res.send(200, team);
          });
      }
    });

  });

};

/**
 * Delete Team
 */
exports.deleteTeam = function(req, res) {
  var team = req.team;
  team.remove(function(err){
    if (err) {
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  });
};

/**
 * add Player
 */
exports.addPlayer = function(req, res) {

  var teamId = req.body.teamId;
  var playerId = req.body.playerId;

  //find team and add league
  Team
    .update({_id: teamId},
    {$push: {players: playerId}},
    {multi: false},
    function(err, affected){
      if (err) {return res.send(500, err);}
      res.send(200);
    });

};

/**
 * drop Player
 */
exports.dropPlayer = function(req, res) {

  var teamId = req.body.teamId;
  var playerId = req.body.playerId;

  //find team and add league
  Team
    .update({_id: teamId},
    {$pull: {players: playerId}},
    {multi: false},
    function(err, affected){
      if (err) {return res.send(500, err);}
      res.send(200);
    });

};




