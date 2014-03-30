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

  var response = {
    league : {},
    user : {}
  };

  var userID = req.query.userId;

  League.findById(req.league._id, function(err, league){

    //check for errors
    if (err) { res.send(500, err); }
    if (!league) { res.send(500, 'Failed to load league ' + id); }

    //add new user to array
    league.users.push(mongoose.Types.ObjectId(userID));

    //save league
    league.save(function(err) {

      //check for errors
      if (err) { res.send(500, err); }

      //find user record and add league
      User.findById(userID, function(err, user){

        //check for errors
        if (err) { return res.json(400, err); }
        if (!user) { return res.send(500, 'Failed to load user ' + userID); }

        //update user leagues
        user.leagues.push(league);

        //save user
        user.save(function(err){

          //check for errors
          if (err) { return res.json(400, err); }

          //set response
          response.league = req.body;
          response.user = user.userInfo;

          //respond
          return res.json(200, response)

        });

      });

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