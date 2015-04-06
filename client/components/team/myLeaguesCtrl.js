'use strict';

angular.module('fantasyGolfApp')
  .controller('myLeaguesCtrl', function ($scope, Team, League) {

    $scope.leagues = [];
    $scope.displayNoLeaguesMessage = true;

    //var teamId = $scope.currentUser.teamId;
    var teamId = '';

    //parse scores into floats for sorting
    var parseScores = function(leagues){
      angular.forEach(leagues, function(league){
        angular.forEach(league.leaderboard, function(team,index){
          league.leaderboard[index].score = parseFloat(team.score);
        });
      });
      return leagues;
    };

    $scope.addChat = function(message, leagueId){
      League.addChat(message, leagueId, teamId)
        .then(function(result){
          $scope.leagues = parseScores(result.data.leagues);
        },function(error){
          $scope.error = error;
        })
    };

    if(teamId){
      Team.getMyTeam(teamId)
        .then(
        function(results){
          $scope.leagues = parseScores(results.data.leagues);
          if($scope.leagues.length){
            $scope.displayNoLeaguesMessage = $scope.leagues.length == 0;
          }

        },
        function(error){
          $scope.error = error;
        });
    }



  });
