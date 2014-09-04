'use strict';

angular.module('fantasyGolfApp')
  .controller('listLeaguesCtrl', function ($scope, Team, League) {

    var teamId = $scope.currentUser.teamId;
    $scope.displayNoLeaguesMessage = false;

    //parse scores into floats for sorting
    var parseScores = function(leagues){
      angular.forEach(leagues, function(league){
        angular.forEach(league.leaderboard, function(team,index){
          league.leaderboard[index].score = parseFloat(team.score);
        });
      });
      return leagues;
    };

    Team.getMyTeam(teamId)
      .then(function(result){
        $scope.team = result.data;
        $scope.team.leagues = parseScores($scope.team.leagues);

        //set no leagues message
        if($scope.team.leagues.length < 1){
          $scope.displayNoLeaguesMessage = true;
        }

      },function(error){
        $scope.error = error;
      }
    );

    $scope.addChat = function(message, leagueId){

      League.addChat(message, leagueId, teamId)
        .then(function(result){
          $scope.team = result.data;
          $scope.team.leagues = parseScores($scope.team.leagues);
        },function(error){
          $scope.error = error;
        })

    };

  });
