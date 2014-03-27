'use strict';

var api = require('./controllers/api'),
    index = require('./controllers'),
    users = require('./controllers/users'),
    team = require('./controllers/team'),
    session = require('./controllers/session'),
    passport = require('passport');

var middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
  app.get('/api/awesomeThings', middleware.auth, api.awesomeThings);
  
  app.post('/api/users', users.create);
  app.put('/api/users', users.changePassword);
  app.get('/api/users/me', users.me);
  app.get('/api/users/:id', users.show);

  app.param('userId', users.user);

  //app.get('/api/team', team.all);
  app.post('/api/team', middleware.auth, team.createTeam);
  app.get('/api/team/:teamId', team.showTeam);
  app.put('/api/team/:teamId', middleware.auth, team.updateTeam);
  app.del('/api/team/:teamId', middleware.auth, team.deleteTeam);

  app.param('teamId', team.getTeam);


  app.post('/api/session', session.login);
  app.del('/api/session', session.logout);

  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/*', middleware.setUserCookie, index.index);
};