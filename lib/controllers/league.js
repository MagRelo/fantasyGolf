var mongoose = require('mongoose'),
  League = mongoose.model('League'),
  Team = mongoose.model('Team'),
  passport = require('passport');

/**
 * Create League
 */
exports.createLeague = function (req, res) {

  var response = {
    league : {},
    team : {}
  };

  //
  var newLeague = new League(req.body);
  var teamId = req.body.teamId;

  newLeague.save(function(err) {
    if (err) {return res.json(500, err);}

    //find team record and add league
    Team
      .update({_id: teamId},
      {$push: {leagues: newLeague._id}},
      {multi: false},
      function(err){

        //check for errors
        if (err) {return res.json(400, err);}

        Team
          .findOne({_id: teamId})
          .populate('leagues')
          .exec(function(err, team){
            if (err) {return res.json(500, err);}
            if (!team) {return res.json(400, 'did not load team ' + teamId);}

            response.league = req.body;
            response.teamLeagues = team.leagues;

            return res.json(200, response)
          });

      })




  });
};

/**
 * Show League
 */
exports.showLeague = function(req, res){
  res.jsonp(req.league);
};

/**
 * List Leagues
 */
exports.allLeagues = function(req, res){

  League
    .find({})
    .select('leagueName private')
    .limit(20)
    .exec(function(err, results){
      res.jsonp(results);
    });

};


/**
 * Update League
 */
exports.joinLeague = function(req, res) {

  var response = {
    league : {},
    teamLeagues : {}
  };

  var teamId = req.query.teamId;

  League.findById(req.league._id, function(err, league){

    //check for errors
    if (err) { res.send(500, err); }
    if (!league) { res.send(400, 'Failed to load league ' + id); }

    //add new team to array
    league.teams.push(mongoose.Types.ObjectId(teamId));

    //save league
    league.save(function(err) {
      if (err) { res.send(500, err); }

      //find team record and add league
      Team
        .update({_id: teamId},
          {$push: {leagues: league._id}},
          {multi: false},
          function(err){
            if (err) {return res.json(500, err);}

            Team
              .findOne({_id: teamId})
              .populate('leagues')
              .exec(function(err, team){
                if (err) {return res.json(500, err);}
                if (!team) {return res.json(400,'Failed to load team ' + id + teamId);}

                //response.league = req.body;
                response.team = team;

                return res.json(200, response)
              });

          })

    });

  });

};

/**
 * Delete League
 */
exports.deleteLeague = function(req, res) {
  var league = req.league;
  league.remove(function(err){
    if (err) {
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  });
};

/**
 * Get League
 */
exports.getLeague = function (req, res, next, id){

  League.findById(id, function (err, league) {

    if (err) {
      return next(err);
    }
    if (!league) {
      return next(new Error('Failed to load league ' + id));
    }

    req.league = league;
    next();

  });

};