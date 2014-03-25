'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    passport = require('passport');

/**
 * Create user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';

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
};

/**
 *  Get profile of specified user
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
 * Update Team
 */
exports.updateTeam = function(req, res) {
  var AuthUserId = req.user._id;

  var Team_Name = String(req.body.Team_Name);
  var Owner_Name = String(req.body.Owner_Name);
  var Player_1 = String(req.body.Player_1);
  var Player_2 = String(req.body.Player_2);
  var Player_3 = String(req.body.Player_3);
  var Player_4 = String(req.body.Player_4);

  User.findById(AuthUserId, function (err, user) {

    user.Team_Name = Team_Name;
    user.Owner_Name = Owner_Name;
    user.Player_1 = Player_1;
    user.Player_2 = Player_2;
    user.Player_3 = Player_3;
    user.Player_4 = Player_4;

    user.save(function(err) {
      if (err) {
        res.send(500, err);
      } else {
        res.send(200);
      }
    });

  });
};

/**
 * Get current user
 */
exports.me = function(req, res) {
  res.json(req.user || null);
};