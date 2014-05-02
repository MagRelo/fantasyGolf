'use strict';

angular.module('fantasyGolfApp')
  .controller('PlayerCtrl', function ($scope, $routeParams, pga) {

    pga.leaderboard({},
      function(data){
        $scope.leaderboard = data;
      },
      function(error){$scope.error = error;}
    );


  });
