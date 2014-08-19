'use strict';

angular.module('fantasyGolfApp')
  .factory('League', function ($http, promiseCache) {

    return {
      listLeagues: function () {
        return promiseCache({
          promise: function () {
            return $http.get('/api/league/');
          },
          ttl: 3600000,
          bustCache: false,
          key: 'listLeagues'
        });
      },
      getLeague: function (leagueId) {
        return promiseCache({
          promise: function () {
            return $http.get('/api/league/' + leagueId);
          },
          ttl: 30000
        });
      },
      createLeague: function(newLeague){
        //bust cache
        promiseCache.remove('listLeagues', false);
        return $http.post('/api/league/', newLeague);
      },
      updateLeague: function(leagueId, newLeague){
        //bust cache
        promiseCache.remove('listLeagues', false);
        return $http.put('/api/league/' + leagueId, newLeague);
      },
      deleteLeague: function(leagueId){
        return $http.del('/api/league/' + leagueId);
      }
    };


//    return $resource('/api/league/:id',
//      {
//        id: '@_id'
//      },
//      {
//        join: {
//          method: 'PUT',
//          isArray: true,
//          params: {id: 'join'}
//        },
//        leave: {
//          method: 'PUT',
//          isArray: true,
//          params: {id: 'leave'}
//        },
//        create: {
//          isArray: true,
//          method: 'POST'
//        }
//      }
//    );
//
  });
