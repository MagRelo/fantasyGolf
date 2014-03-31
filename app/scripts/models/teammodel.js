'use strict';

angular.module('fantasyGolfApp')
  .factory('teamModel', function ($rootScope, $q, Team) {
    // Service logic
    // ...
    var team = {};

    // Public API here
    return {

      team: team,

      getTeam: function(id) {
        var deferred = $q.defer();

        if (team.userId) {
          deferred.resolve(team);
        } else {
          Team.get({ id: id }, function(response){
            team = response;
            deferred.resolve(response);
          });
        }
        return deferred.promise;
      },

      saveTeam : function(id, team){
        var deferred = $q.defer();

        if(id){

          //update
          Team.update(id, team, function(response){
            team = response;
            deferred.resolve(team);
          });

        } else {

          //create
          var newTeam = new Team(team);

          newTeam.$save(function(response){
            team = response.team;
            $rootScope.currentUser.teamId = response.teamId;
            deferred.resolve(team);
          });

        }

        return deferred.promise;

      }

    };
  });
