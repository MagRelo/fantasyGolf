'use strict';

angular.module('fantasyGolfApp')
  .factory('tournamentModel', function ($q, $http) {
    // Service logic
    // ...
    var tourneyData = {};

    function loadData(deferred) {
      $http.get('api/leaderboard')
        .success(function(data) {
          tourneyData = data;
          deferred.resolve(data);
        })
        .error(function() {
          deferred.reject();
        });
    }

    // Public API here
    return {

      tournamentInfo: function() {
        var deferred = $q.defer();

        if (tourneyData.info) {
          deferred.resolve(tourneyData);
        } else {
          loadData(deferred);
        }
        return deferred.promise;
      }

    };
  });
