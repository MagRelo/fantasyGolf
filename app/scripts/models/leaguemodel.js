'use strict';

angular.module('fantasyGolfApp')
  .factory('leagueModel', function ($q, League) {
    // Service logic
    // ...
    var leagues = {};

    //    function loadData(id, deferred) {
    //      League.get(id,
    //        function(data) {
    //          team = data;
    //          deferred.resolve(data);
    //        },function() {
    //          deferred.reject();
    //        })
    //    }

    // Public API here
    return {

      leagues: function() {
        var deferred = $q.defer();

        if (leagues.length) {
          deferred.resolve(leagues);
        } else {
          League.query({}, function(response){
            leagues = response;
            deferred.resolve(response)
          });
        }
        return deferred.promise;
      }

    };
  });
