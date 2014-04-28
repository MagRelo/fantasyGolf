'use strict';

angular.module('fantasyGolfApp')
  .controller('PlayerCtrl', function ($scope, $routeParams, pga) {

    $scope.player = {};
    $scope.playerId = $routeParams.playerId;

    $scope.scoringStyle = 'modstable';

    pga.get({playerId: $scope.playerId},
      function(player){
        angular.extend($scope.player, player);
      },
      function(error){$scope.error = error;}
    );

    pga.setup({},
      function(data){
        angular.forEach(data.field, function(fieldPlayer){
          if(fieldPlayer.id == $scope.playerId){
            angular.extend($scope.player, fieldPlayer);
          }
        });
      },
      function(error){$scope.error = error;}
    );


  });
