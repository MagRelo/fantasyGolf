'use strict';

angular.module('fantasyGolfApp')
  .controller('PlayerCtrl', function ($scope, $routeParams, pga) {

    $scope.playerId = $routeParams.playerId;

    pga.get({playerId: $scope.playerId},
      function(player){
        $scope.player = player;
      },
      function(error){}
    );


  });
