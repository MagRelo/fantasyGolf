'use strict';

angular.module('fantasyGolfApp')
  .factory('Team', function ($http, promiseCache) {

    return {
      getTeam: function (teamId) {
        return $http.get('/api/team/' + teamId);
      },
      updateTeam: function (team, teamId) {
        promiseCache.remove('getTeam', false);

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
