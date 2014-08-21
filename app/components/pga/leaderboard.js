'use strict';

angular.module('fantasyGolfApp')
  .controller('LeaderboardCtrl', function ($scope, $routeParams, pga) {

    $scope.dataLoaded = false;

    pga.getLeaderboard()
      .then(
        function(result){
          $scope.players = result.data.players;
          $scope.courses = result.data.courses;
          $scope.info = result.data.info;

          $scope.dataLoaded = true;
        },
        function(error){
          $scope.error = error;

          $scope.dataLoaded = true;
        }
    );

  });
