'use strict';

angular.module('fantasyGolfApp')
  .controller('TournamentCtrl', function ($scope, Team) {

    if($scope.currentUser.teamId){
      $scope.team = Team.get({id: $scope.currentUser.teamId})
    }

  });
