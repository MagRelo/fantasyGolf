'use strict';

angular.module('fantasyGolfApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'firebase',
  'angular-promise-cache'
])

  .config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'components/userSession/main'
      })
      .when('/tournament', {
        templateUrl: 'components/tournament/tournament',
        authenticate: true
      })
      .when('/team', {
        templateUrl: 'components/team/editTeam',
        authenticate: true
      })
      .when('/leagues', {
        templateUrl: 'components/league/lobby',
        authenticate: true
      })
      .when('/editleagues', {
        templateUrl: 'components/league/league',
        authenticate: true
      })
      .when('/player/:playerId', {
        templateUrl: 'components/player/player',
        controller: 'PlayerCtrl',
        authenticate: true
      })
      .when('/league/:leagueId', {
        templateUrl: 'components/league/viewleague',
        controller: 'ViewLeagueCtrl',
        authenticate: true
      })
      .when('/setup', {
        templateUrl: 'components/userSession/setup',
        authenticate: true
      })
      .when('/leaderboard', {
        templateUrl: 'components/leaderboard/leaderboard',
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
      
      if (next.authenticate && !Auth.isLoggedIn()) {
        $location.path('/');
      }
    });
  });