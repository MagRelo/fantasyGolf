'use strict';

angular.module('fantasyGolfApp')
  .factory('Team', function ($resource) {
    return $resource('/api/team/:id', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT',
        params: {}
      }
    });
  });
