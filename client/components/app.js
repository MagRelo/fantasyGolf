/* global Raven:true */
'use strict';

angular.module('fantasyGolfApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngAnimate',
  'ui.bootstrap',
  'angular-promise-cache'
])

  .config(function ($routeProvider, $locationProvider, $httpProvider) {

    //configure logging through sentry
    Raven.config('https://19cfd39e1cb249a59e737f67b0f1f4ea@app.getsentry.com/29841', {
      logger: 'Ballstrikers Logger'
    }).install();

    $routeProvider
      .when('/', {
        templateUrl: 'components/pga/leaderboard'
      })
      .when('/myleagues', {
        templateUrl: 'components/team/myLeagues',
        authenticate: true
      })
      .when('/editleagues', {
        templateUrl: 'components/league/editLeagues',
        authenticate: true
      })
      .when('/team/:teamId', {
        templateUrl: 'components/team/displayTeam',
        authenticate: true
      })
      .when('/myteam', {
        templateUrl: 'components/team/myTeam',
        authenticate: true
      })
      .when('/editteam', {
        templateUrl: 'components/team/editTeam',
        authenticate: true
      })
      .when('/player/:playerId', {
        templateUrl: 'components/pga/player',
        controller: 'PlayerCtrl',
        authenticate: true
      })
      .when('/leaderboard', {
        templateUrl: 'components/pga/leaderboard',
        authenticate: true
      })
      .when('/admin', {
        templateUrl: 'components/admin/tournamentAdmin',
        authenticate: true
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);

    // Intercept 401s and 403s and redirect you to login
    $httpProvider.interceptors.push(['$q', '$location', function($q, $location) {
      return {
        'responseError': function(response) {
          if(response.status === 401 || response.status === 403) {
            $location.path('/');
            return $q.reject(response);
          }
          else {
            return $q.reject(response);
          }
        }
      };
    }]);
  })
  .run(function ($rootScope, $location, Auth) {

    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeStart', function (event, next) {

      //if(Auth.isLoggedIn() && $location.path() == '/'){
      //  $location.path('/myleagues');
      //}
      //
      //if (next.authenticate && !Auth.isLoggedIn()) {
      //  $location.path('/');
      //}

    });
  });
