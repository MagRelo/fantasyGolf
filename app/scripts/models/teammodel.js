'use strict';

angular.module('fantasyGolfApp')
  .factory('teamModel', function ($q, Team) {
    // Service logic
    // ...
    var team = {};

//    function loadData(id, deferred) {
//      Team.get(id,
//        function(data) {
//          team = data;
//          deferred.resolve(data);
//        },function() {
//          deferred.reject();
//        })
//    }

    // Public API here
    return {

      team: function(id) {
        var deferred = $q.defer();

        if (team.userId) {
          deferred.resolve(team);
        } else {
          Team.get({ id: id }, function(response){
            team = response;
            deferred.resolve(response)
          });
        }
        return deferred.promise;
      },

      updateTeam: function(id, team){
        var deferred = $q.defer();

        Team.update(id, team, function(response){
          team = response;
          deferred.resolve(response)
        });

        return deferred.promise;
      },

      createTeam: function(team){
        var deferred = $q.defer();

        var newTeam = new Team(team);

        newTeam.$save(function(response){
          team = response;
          deferred.resolve(response)
        });

        return deferred.promise;
      }

    };
  });
