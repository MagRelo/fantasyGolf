'use strict';

angular.module('fantasyGolfApp')
  .controller('listLeaguesCtrl', function ($scope, Team, League) {


    var teamId = $scope.currentUser.teamId;

    Team.getTeam(teamId)
      .then(function(result){
        $scope.team = result.data;
      },function(error){
        $scope.error = error;
      }
    );

    $scope.addChat = function(message, leagueId){

      League.addChat(message, leagueId, teamId)
        .then(function(result){
          $scope.team = result.data;
        },function(error){
          $scope.error = error;
        })

    };

  });
