'use strict';

angular.module('fantasyGolfApp')
  .controller('editLeaguesCtrl', function ($scope, League, Team) {

    var teamId = $scope.currentUser.teamId;

    Team.getTeam(teamId)
      .then(function(result){
        $scope.team = result.data;
      },function(error){
        $scope.error = error;
      }
    );

    League.listLeagues()
      .then(function(result) {
        $scope.leagues = markActiveLeagues(teamId, result.data);
      },function(error){
        $scope.error = error;
      }
    );

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

    $scope.editLeague = function(leagueId, newLeague){

      //remove team id from league?

      League.updateLeague(leagueId, newLeague)

    };

    $scope.joinLeague = function(leagueId, teamId){

      League.joinLeague(leagueId, teamId)
        .then(function(result){
          $scope.leagues = markActiveLeagues(teamId, result.data);
          },function(error){
        }
      )

    };

    $scope.leaveLeague = function(leagueId, teamId){

      League.leaveLeague(leagueId, teamId)
        .then(function(result){



          $scope.leagues = markActiveLeagues(teamId, result.data);
        },function(error){
        }
      )

    };

  });


//flag leagues to filter the list of available leagues to join
var markActiveLeagues = function(teamId, leagues){

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