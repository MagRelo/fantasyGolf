'use strict';

angular.module('fantasyGolfApp')
  .controller('tournamentAdminCtrl', function ($scope, Tournament) {

    $scope.editPlayerId = 0;


    Tournament.getTournament()
      .then(function(results){
        $scope.tournament = angular.copy(results.data);
      }, function(error){
        $scope.tournamentError = error;
      });

    Tournament.getPlayers()
      .then(function(results){
        $scope.players = angular.copy(results.data);
      }, function(error){
        $scope.playerError = error;
      });

    $scope.runSetup = function(){
      Tournament.runSetup()
        .then(function(result){
          $scope.setupResponse = result.data;
        },function(error){
          $scope.setupError = error;
        })
    };

    $scope.runRefreshSetup = function(){
      Tournament.refreshSetup()
        .then(function(result){
          $scope.refreshSetupResponse = result.data;
        },function(error){
          $scope.refreshSetupError = error;
        })
    };

    $scope.calcPlayerScores = function(){

      Tournament.calcPlayers()
        .then(function(result){
          $scope.playerResponse = result.data;

        },function(error){
          $scope.playerError = error;

        })
    };

    $scope.calcTeamScores = function(){

      Tournament.calcTeams()
        .then(function(result){
          $scope.teamResponse = result.data;

        },function(error){
          $scope.teamError = error.data;
          $scope.teamError.status = error.status;
        })
    };

  });