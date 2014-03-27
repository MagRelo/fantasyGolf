'use strict';

angular.module('fantasyGolfApp')
  .controller('TournamentCtrl', function ($scope, teamModel, pga, tournamentModel) {

    //get tournament data
    tournamentModel.tournamentInfo().then(function(data){
      $scope.tournament = data;
    });

    //get team data
    teamModel.team($scope.currentUser.teamId).then(function(data){
      $scope.team = data;
    });


    //list user leagues
    $scope.userLeagues = $scope.currentUser.leagues;

  });
