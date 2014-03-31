'use strict';

angular.module('fantasyGolfApp')
  .controller('TournamentCtrl', function ($scope, teamModel, pga, tournamentModel) {

    //1. Display Tournament info
    tournamentModel.tournamentInfo().then(function(data){
      $scope.tournament = data;
      $scope.players = data.players;

    });

    //2. Display Team Info
    if($scope.currentUser.teamId){
      teamModel.getTeam($scope.currentUser.teamId).then(function(data){

        $scope.team = data;
        $scope.team.players = [];

        angular.forEach($scope.players, function(tourneyPlayer){

          if(tourneyPlayer.id == $scope.team.player1
            || tourneyPlayer.id == $scope.team.player2
            || tourneyPlayer.id == $scope.team.player3
            || tourneyPlayer.id == $scope.team.player4){

            $scope.team.players.push(tourneyPlayer)

          }

        })

      });
    }

    //3.Display User Leagues
    $scope.userLeagues = $scope.currentUser.leagues;

  });
