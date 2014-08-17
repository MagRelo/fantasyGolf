'use strict';

angular.module('fantasyGolfApp')
  .controller('PlayerCtrl', function ($scope, $routeParams, pga) {

    $scope.player = {};
    $scope.playerId = $routeParams.playerId;

    $scope.scoringStyle = 'modstable';

    pga.getPlayer($scope.playerId)
      .then(
      function(result){
        angular.extend($scope.player, result.data);
      },
      function(error){$scope.error = error;}
    );

    pga.getSetup()
      .then(
      function(result){
        angular.forEach(result.data.field, function(fieldPlayer){
          if(fieldPlayer.id == $scope.playerId){
            angular.extend($scope.player, fieldPlayer);
          }
        });
      },
      function(error){$scope.error = error;}
    );


  });
