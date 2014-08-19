'use strict';

angular.module('fantasyGolfApp')
  .controller('editLeaguesCtrl', function ($scope, $q, $firebase, League) {

    League.listLeagues()
      .then(function(result) {
        $scope.leagues = result.data;

      },function(error){
        $scope.error = error;
      });

    $scope.createLeague = function(newLeague){

      League.createLeague(newLeague)
        .then(
          function(response){
            $scope.leagues = response.data;
            $scope.newLeague = {};
            $scope.LeagueForm.$setPristine();
          },
          function(error){}
        )

    };

    $scope.leaveLeague = function(teamId){

      //remove team id from league?

      League.updateLeague(leagueId, newLeague)

    };




  });
