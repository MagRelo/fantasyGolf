'use strict';

angular.module('fantasyGolfApp')
  .controller('ViewLeagueCtrl', function ($scope, $routeParams, League) {

    $scope.leagueId = $routeParams.leagueId;

    League.get({id: $routeParams.leagueId},
      function(league){
        $scope.league = league;
      },
      function(error){
        $scope.error = error;
      })

  });
