'use strict';

angular.module('fantasyGolfApp')
  .controller('ViewLeagueCtrl', function ($scope, $routeParams, League) {

    $scope.leagueId = $routeParams.leagueId;

    League.getLeague($routeParams.leagueId)
      .then(
        function(league){
          $scope.league = league;
        },
        function(error){
          $scope.error = error;
        }
      )

  });
