var mongoose = require('mongoose'),
  async = require('async'),
  League = mongoose.model('League'),
  Team = mongoose.model('Team'),
  passport = require('passport');


/**
 * List Leagues
 */
exports.allLeagues = function(req, res){

  League
    .find({})
    .populate('teams')
    .exec(function(err, results){
      res.jsonp(results);
    });

};

/**
 * Get League on any route with LeagueId
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

/**
 * Show League
 */
exports.showLeague = function(req, res){
  res.jsonp(req.league);
};


/**
 * Create League
 */
exports.createLeague = function (req, res) {

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

        League
          .find({})
          .populate('teams')
          .exec(function(err, results){
            res.jsonp(results);
          });
      });

  });
};


/**
 * Join League
 */
exports.joinLeague = function(req, res) {

  var teamId = req.body.teamId;
  var leagueId = req.body.leagueId;

  //update team and league in parallel
  async.parallel([
    function(callback){
      //find team and add league
      Team
        .update({_id: teamId},
        {$push: {leagues: leagueId}},
        {multi: false},
        function(err){
          if (err) {console.log(err);}
          callback(err, 'ok')
        });
    },
    function(callback){
      //find league and add team
      League
        .update({_id: leagueId},
        {$push: {teams: teamId}},
        {multi: false},
        function(err){
          if (err) {console.log(err);}
          callback(err, 'ok')
        });
    }
  ],
  function(err){
    if (err) {res.send(500, err);}

    League
      .find({})
      .populate('teams')
      .exec(function(err, results){
        res.jsonp(results);
      });

  });

};


exports.leaveLeague = function(req, res) {

  var teamId = req.body.teamId;
  var leagueId = req.body.leagueId;

  //update team and league in parallel
  async.parallel([
    function(callback){
      //find team and add league
      Team
        .update({_id: teamId},
        {$pull: {leagues: leagueId}},
        {multi: false},
        function(err){
          if (err) {console.log(err);}
          callback(err, 'ok')
        });
    },
    function(callback){
      //find league and add team
      League
        .update({_id: leagueId},
        {$pull: {teams: teamId}},
        {multi: false},
        function(err){
          if (err) {console.log(err);}
          callback(err, 'ok')
        });
    }
  ],
    function(err){
      if (err) {res.send(500, err);}

      League
        .find({})
        .populate('teams')
        .exec(function(err, results){
          res.jsonp(results);
        });
    }
  );

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

