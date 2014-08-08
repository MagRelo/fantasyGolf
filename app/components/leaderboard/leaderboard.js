'use strict';

angular.module('fantasyGolfApp')
  .controller('LeaderboardCtrl', function ($scope, $routeParams, pga) {

    pga.leaderboard({},
      function(data){
        $scope.leaderboard = data;
        $scope.course = data.courses[0];
        $scope.info = data.info;
      },
      function(error){$scope.error = error;}
    );


  });
