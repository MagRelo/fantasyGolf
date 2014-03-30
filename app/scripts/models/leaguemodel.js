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

        }
        else {

          //create
          var newLeague = new League(league);

          newLeague.$save(function(response){

            //update user object
            $rootScope.currentUser.leagues = response.userLeagues;

            deferred.resolve(leagues);
          });

        }

        return deferred.promise;

      },

      joinLeague: function(leagueIndex, userId){
        var deferred = $q.defer();

        League.join({userId: userId}, leagues[leagueIndex], function(response){

          //update user object
          $rootScope.currentUser.leagues = response.userLeagues;

          //remove league from list
          leagues.splice(leagueIndex, 1);

          deferred.resolve(leagues);
        });

        return deferred.promise;

      }

    };
  });
