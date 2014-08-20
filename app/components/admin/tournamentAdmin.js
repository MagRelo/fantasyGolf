'use strict';

angular.module('fantasyGolfApp')
  .controller('tournamentAdminCtrl', function ($scope, Tournament) {

    $scope.editPlayerId = 0;

    Tournament.getTournament()
      .then(function(results){
        $scope.tournament = angular.copy(results.data);
      }, function(error){
        $scope.tournamentError = error;
      })

  });