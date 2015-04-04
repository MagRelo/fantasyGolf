'use strict';

var index = require('./controllers'),
    users = require('./controllers/users'),
    team = require('./controllers/team'),
    league = require('./controllers/league'),
    tournament = require('./controllers/tournament'),
    session = require('./controllers/session'),
    pga = require('./controllers/pga'),
    admin = require('./controllers/admin'),
    passport = require('passport');

var middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function(app) {

  app.get('/api/pga/leaderboard', pga.leaderboard);

  // User API Routes
  app.post('/api/users', users.createUser);
  app.put('/api/users', users.changePassword);
  app.get('/api/users/me', users.me);
  app.get('/api/users/:id', users.show);
  app.param('userId', users.user);

  //team CRUD routes
  app.get('/api/team/:teamId', team.showTeam);
  app.post('/api/team', middleware.auth, team.createTeam);
  app.put('/api/team/:teamId', middleware.auth, team.updateTeam);
  app.del('/api/team/:teamId', middleware.auth, team.deleteTeam);
  app.param('teamId', team.getTeam);

  //league CRUD routes
  app.get('/api/league', league.allLeagues);
  app.get('/api/league/:leagueId', league.showLeague);
  app.post('/api/league', middleware.auth, league.createLeague);
  app.del('/api/league/:leagueId', middleware.auth, league.deleteLeague);
  app.put('/api/league/join', middleware.auth, league.joinLeague);
  app.put('/api/league/leave', middleware.auth, league.leaveLeague);
  app.put('/api/league/chat', middleware.auth, league.addMessage);
  app.param('leagueId', league.getLeague);

  //pga routes
  app.get('/api/pga/setup',  middleware.auth, pga.tournamentSetup);
  app.get('/api/pga/field',  middleware.auth, pga.getField);
  app.get('/api/pga/player/:playerId',  middleware.auth, pga.getScorecard);

  //tournament routes
  app.put('/api/tournament/:tournamentId', middleware.auth, tournament.updateTournament);

  //Admin functions
  app.get('/api/admin/users',  middleware.admin, users.listUsers);
  app.del('/api/admin/users/:id',  middleware.admin, users.deleteUser);
  app.post('/api/admin/setup',  middleware.admin, admin.setup);
  app.post('/api/admin/refreshsetup',  middleware.admin, admin.refreshSetup);
  app.post('/api/admin/calcplayers',  middleware.admin, admin.calcPlayers);
  app.post('/api/admin/calcteams', middleware.admin, admin.calcTeams);
  app.post('/api/admin/calcleagues',  middleware.admin, admin.calcLeagues);


  app.post('/api/session', session.login);
  app.del('/api/session', session.logout);

  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/components/*', index.partials);
  app.get('/*', middleware.setUserCookie, index.index);
};
