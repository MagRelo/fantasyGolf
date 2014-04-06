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
          params: {id: 'join'}
        },
        leave: {
          method: 'PUT',
          params: {id: 'leave'}
        }
      }
    );
  });
