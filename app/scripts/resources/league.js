'use strict';

angular.module('fantasyGolfApp')
  .factory('League', function ($resource) {
    return $resource('/api/league/:id',
      {
        id: '@_id'
      },
      {
        join: {
          method: 'PUT',
          isArray: true,
          params: {id: 'join'}
        },
        leave: {
          method: 'PUT',
          isArray: true,
          params: {id: 'leave'}
        }
      }
    );
  });
