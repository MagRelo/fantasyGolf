'use strict';

angular.module('fantasyGolfApp')
  .factory('League', function ($resource) {
    return $resource('/api/league/:id', {
      id: '@_id'
    }, { //parameters default
      join: {
        method: 'PUT',
        params: {
          teamID: '@_teamID'
        }
      }
    });
  });
