'use strict';

angular.module('fantasyGolfApp')
  .controller('TournamentCtrl', function ($scope, Team) {

    //list user leagues
    $scope.userLeagues = $scope.currentUser.leagues;

    if($scope.currentUser.teamId){
      $scope.team = Team.get({id: $scope.currentUser.teamId})
    }

  });
