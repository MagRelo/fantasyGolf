'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Team = mongoose.model('Team'),
    passport = require('passport');

/**
 * Create user
 */
exports.create = function (req, res, next) {

  //create team first, save key with user
  var userTeam = new Team({ownerName: req.body.name});
  userTeam.save(function(err){
    if(err){return res.json(500, err);}
    if(!userTeam._id){return res.json(500, 'load did not produce id');}
    console.log('team id: ' + userTeam._id);

    //create user
    var newUser = new User(req.body);
    newUser.provider = 'local';
    newUser.teamId = userTeam._id;

    //save
    newUser.save(function(err) {
      if (err) {
        // Manually provide our own message for 'unique' validation errors, can't do it from schema
        if(err.errors.email.type === 'Value is not unique.') {
          err.errors.email.type = 'The specified email address is already in use.';
        }
        return res.json(400, err);
      }

      req.logIn(newUser, function(err) {
        if (err) return next(err);

        return res.json(req.user.userInfo);
      });
    });

  });

};

/**
 *  Get profile of specified user (http)
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(new Error('Failed to load User'));
  
    if (user) {
      res.send({ profile: user.profile });
    } else {
      res.send(404, 'USER_NOT_FOUND');
    }
  });
};

/**
 *  Get profile of specified user (internal)
 */
exports.user = function (req, res, next, id) {

  User.findById(id, function (err, user) {
    if (err) return next(new Error('Failed to load User'));

    if (err){
      return next(err);
    }
    if (!user) {
      return next(new Error('Failed to load User ' + id))
    }

    req.user = user;
    next()
  });
};

/**
 * Change password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {

      user.password = newPass;
      user.save(function(err) {
        if (err) {
          res.send(500, err);
        } else {
          res.send(200);
        }
      });
    } else {
      res.send(400);
    }
  });
};



/**
 * Get current user
 */
exports.me = function(req, res) {
  res.json(req.user || null);
};