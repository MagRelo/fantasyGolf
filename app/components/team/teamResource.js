'use strict';

angular.module('fantasyGolfApp')
  .factory('Team', function ($http, promiseCache) {

    return {
      getMyTeam: function (teamId) {
        return promiseCache({
          promise: function() {
            return $http.get('/api/team/' + teamId);
          },
          ttl: 900000,
          bustCache: false,
          key: 'getTeam' //15 min
        });
      },
      displayTeam: function (teamId) {
        return $http.get('/api/team/' + teamId);
      },
      updateTeam: function (team, teamId) {
        promiseCache.remove('getTeam', false);
        return $http.put('/api/team/' + teamId, team);
      }
    };
  });
