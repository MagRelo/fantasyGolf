'use strict';

angular.module('fantasyGolfApp')
  .factory('pga', function ($resource) {
    return $resource('/api/leaderboard/:id', {
      id: '@_id'
    }, { //parameters default
      update: {
        method: 'PUT',
        params: {}
      }
    });
  });
