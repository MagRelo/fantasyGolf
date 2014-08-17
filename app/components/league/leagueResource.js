'use strict';

angular.module('fantasyGolfApp')
  .factory('League', function ($http, promiseCache) {

    return {
      getLeagues: function () {
        return promiseCache({
          promise: function () {
            return $http.get('/api/league/');
          },
          ttl: 3600000 //1 hour
        });
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
