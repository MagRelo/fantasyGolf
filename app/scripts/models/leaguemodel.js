'use strict';

angular.module('fantasyGolfApp')
  .factory('leagueModel', function ($rootScope, $q, League) {
    // Service logic
    // ...
    var leagues = [];

    // Public API here
    return {

      leagues: function() {
        var deferred = $q.defer();

        if (leagues.length) {
          deferred.resolve(leagues);
        } else {
          League.query({}, function(response){
            leagues = response;
            deferred.resolve(response);
          });
        }
        return deferred.promise;
      },

      saveLeague : function(id, league){
        var deferred = $q.defer();

        if(id){

          //update
          League.update(id, league, function(response){
            league = response;
            deferred.resolve(response);
          });

        } else {

          //create
          var newLeague = new League(league);

          newLeague.$save(function(response){
            leagues.push(response.league);
            $rootScope.currentUser = response.user;
            deferred.resolve(leagues);
          });

        }

        return deferred.promise;

      },

      joinLeague: function(league, userId){
        var deferred = $q.defer();

        league.users = league.users || [];
        league.users.push(userId);

        League.update(league, function(err, response){

          $rootScope.currentUser = response.user;
          leagues = response.leagues;

          deferred.resolve(leagues);
        });

        return deferred.promise;

      }

    };
  });
