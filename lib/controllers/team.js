var mongoose = require('mongoose'),
  Team = mongoose.model('Team'),
  User = mongoose.model('User'),
  passport = require('passport');

/**
 * Create Team
 */
exports.createTeam = function (req, res) {

  var response = {
    team : {},
    user : {}
  };
  var newTeam = new Team(req.body);

  newTeam.save(function(err) {
    if (err) {
      // Manually provide our own message for 'unique' validation errors, can't do it from schema
      //      if(err.errors.email.type === 'Value is not unique.') {
      //        err.errors.email.type = 'The specified email address is already in use.';
      //      }
      return res.json(400, err);
    }

    //set response
    response.team = req.body;


    //find user record and add team
    User.findById(newTeam.userId, function(err, user){
      if (err) {
        return res.json(400, err);
      }

      user.teamId = newTeam._id;

      user.save(function(err){
        if (err) {
          return res.json(400, err);
        }
      });

      response.user.name = user.name;
      response.user.email = user.email;
      response.user.provider = user.provider;
      response.user.teamId = user.teamId;
      response.user._id = user.userId;

      res.json(200, response)

    });

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

    if (err) {
      res.send(500, err);
    }
    if (!team) {
      res.send(500, 'Failed to load team ' + id);
    }

    team.userID = String(req.body.userId);
    team.teamName = String(req.body.teamName);
    team.ownerName = String(req.body.ownerName);
    team.player1 = String(req.body.player1);
    team.player2 = String(req.body.player2);
    team.player3 = String(req.body.player3);
    team.player4 = String(req.body.player4);

    team.save(function(err) {
      if (err) {
        res.send(500, err);
      } else {
        res.send(200, team);
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
 * Get Team
 */
exports.getTeam = function (req, res, next, id){

  Team.findById(id, function (err, team) {

    if (err) {
      return next(err);
    }
    if (!team) {
      return next(new Error('Failed to load team ' + id));
    }

    req.team = team;
    next();

  });

};