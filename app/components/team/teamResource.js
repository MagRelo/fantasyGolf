'use strict';

angular.module('fantasyGolfApp')
  .factory('Team', function ($resource) {
    return $resource('/api/team/:id', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT',
        params: {}
      },
      add: {
        method: 'PUT',
        isArray: false,
        params: {id: 'add'}
      },
      drop: {
        method: 'PUT',
        isArray: false,
        params: {id: 'drop'}
      }
    });
  });
