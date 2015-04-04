'use strict';

angular.module('fantasyGolfApp')
  .controller('myLeaguesCtrl', function ($scope, Team, League) {

    $scope.displayNoLeaguesMessage = false;
    var teamId = $scope.currentUser.teamId;

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
      .then(
        function(results){
          $scope.leagues = parseScores(results.data.leagues);
          $scope.displayNoLeaguesMessage = $scope.leagues.length == 0;
        },
        function(error){
        });

    $scope.addChat = function(message, leagueId){
      League.addChat(message, leagueId, teamId)
        .then(function(result){
          $scope.leagues = parseScores(result.data.leagues);
        },function(error){
          $scope.error = error;
        })
    };

  });
