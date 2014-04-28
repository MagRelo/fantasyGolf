'use strict';

angular.module('fantasyGolfApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
