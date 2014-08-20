'use strict';

angular.module('fantasyGolfApp')
  .factory('pga', function ($http, promiseCache) {

    return {
      getLeaderboard: function() {
        return promiseCache({
          promise: function() {
            return $http.get('/api/pga/leaderboard');
          },
          ttl: 900000 //15 min
        });
      },
      getPlayer: function(playerId) {
        return promiseCache({
          promise: function() {
            return $http.get('/api/pga/player/' + playerId);
          },
          ttl: 900000 //15 min
        });
      },
      getField: function() {
        return promiseCache({
          promise: function() {
            return $http.get('/api/pga/field');
          },
          ttl: 3600000 //1 hour
        });
      },
      getSetup: function() {
        return promiseCache({
          promise: function() {
            return $http.get('/api/pga/setup');
          },
          ttl: 3600000 //1 hour
        });
      }
    };

  });
