var mongoose = require('mongoose'),
  League = mongoose.model('League'),
  User = mongoose.model('User'),
  passport = require('passport');

/**
 * Create League
 */
exports.createLeague = function (req, res) {

  var response = {
    league : {},
    user : {}
  };

  //
  var newLeague = new League(req.body);

  newLeague.save(function(err) {
    if (err) {
      return res.json(400, err);
    }

    //set response
    response.league = req.body;

    //find user record and add league
    User.findById(newLeague.ownerUserId, function(err, user){
      if (err) {
        return res.json(400, err);
      }

      user.leagues.push(newLeague);

      user.save(function(err){
        if (err) {
          return res.json(400, err);
        }
      });

      response.user = user.userInfo;

      res.json(200, response)

    });

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
exports.updateLeague = function(req, res) {

  League.findById(req.league._id, function(err, league){

    if (err) {
      res.send(500, err);
    }
    if (!league) {
      res.send(500, 'Failed to load league ' + id);
    }

    league.userID = String(req.body.userId);
    league.leagueName = String(req.body.leagueName);
    league.ownerName = String(req.body.ownerName);
    league.player1 = String(req.body.player1);
    league.player2 = String(req.body.player2);
    league.player3 = String(req.body.player3);
    league.player4 = String(req.body.player4);

    league.save(function(err) {
      if (err) {
        res.send(500, err);
      } else {
        res.send(200, league);
      }
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