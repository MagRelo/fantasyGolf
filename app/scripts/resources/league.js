'use strict';

angular.module('fantasyGolfApp')
  .factory('League', function ($resource) {
    return $resource('/api/league/:id', {
      id: '@_id'
    }, { //parameters default
      update: {
        method: 'PUT',
        params: {}
      }
    });
  });
