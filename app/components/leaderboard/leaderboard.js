'use strict';

angular.module('fantasyGolfApp')
  .controller('LeaderboardCtrl', function ($scope, $routeParams, pga) {

    pga.getLeaderboard()
      .then(
        function(result){
          $scope.players = result.data.players;
          $scope.courses = result.data.courses;
          $scope.info = result.data.info;
        },
        function(error){
          $scope.error = error;
        }
    );


  });
