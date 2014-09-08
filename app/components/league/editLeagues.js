'use strict';

angular.module('fantasyGolfApp')
  .controller('editLeaguesCtrl', function ($scope, League) {

    var teamId = $scope.currentUser.teamId;

    var markActiveLeagues = function(teamId, leagues){
      //flag leagues to filter the list of available leagues to join
      angular.forEach(leagues, function(league){
        league.active = false;
        angular.forEach(league.teams, function(team){
          if(team._id == teamId){
            league.active = true;
          }
        })
      });
      return leagues;
    };

    League.listLeagues()
      .then(function(result) {
        $scope.leagues = markActiveLeagues(teamId, result.data);
      },function(error){
        $scope.error = error;
      }
    );

    $scope.joinLeague = function(leagueId, teamId){

      League.joinLeague(leagueId, teamId)
        .then(function(result){
          $scope.leagues = markActiveLeagues(teamId, result.data);
          },function(error){
          $scope.leagueError = error.data;
          $scope.leagueError.status = error.status;
        }
      )

    };

    $scope.leaveLeague = function(leagueId, teamId){
      League.leaveLeague(leagueId, teamId)
        .then(function(result){
          $scope.leagues = markActiveLeagues(teamId, result.data);
        },function(error){
          $scope.leagueError = error.data;
          $scope.leagueError.status = error.status;
        }
      )

    };

    $scope.createLeague = function(newLeague){

      League.createLeague(newLeague)
        .then(
        function(result){
          $scope.leagues = markActiveLeagues(teamId, result.data);
          $scope.newLeague = {};
          $scope.LeagueForm.$setPristine();
        },
        function(error){
          $scope.leagueError = error.data;
          $scope.leagueError.status = error.status;
        }
      )

    };

  });


