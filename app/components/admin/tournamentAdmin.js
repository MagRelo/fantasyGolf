'use strict';

angular.module('fantasyGolfApp')
  .controller('tournamentAdminCtrl', function ($scope, Tournament) {

    Tournament.getTournament()
      .then(function(results){
        $scope.tournament = angular.copy(results.data);
      }, function(error){
        $scope.tournamentError = error;
      })

  });