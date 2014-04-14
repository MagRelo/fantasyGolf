'use strict';

angular.module('fantasyGolfApp')
  .factory('pga', function ($resource) {
    return $resource('/api/pga/:playerId', {
      playerId: '@_playerId'
    }, { //parameters default
      update: {
        method: 'PUT',
        params: {}
      },
      setup: {
        method: 'GET',
        params: {
          playerId: 'setup'
        }
      },
      getField: {
        method: 'GET',
        params: {
          playerId: 'field'
        }
      }

    });
  });
