'use strict';

angular.module('fantasyGolfApp')
  .factory('Team', function ($http, promiseCache) {

    return {
      getTeam: function (teamId) {
        return promiseCache({
          promise: function () {
            return $http.get('/api/team/' + teamId);
          },
          ttl: -1 //never expire
        });
      },
      updateTeam: function (team, teamId) {
        return $http.put('/api/team/' + teamId, team);
      }
    };





//    return $resource('/api/team/:id', {
//      id: '@_id'
//    }, {
//      update: {
//        method: 'PUT',
//        params: {}
//      },
//      add: {
//        method: 'PUT',
//        isArray: false,
//        params: {id: 'add'}
//      },
//      drop: {
//        method: 'PUT',
//        isArray: false,
//        params: {id: 'drop'}
//      }
//    });
  });
