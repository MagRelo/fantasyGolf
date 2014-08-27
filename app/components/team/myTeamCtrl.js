'use strict';

angular.module('fantasyGolfApp')
  .controller('myTeamCtrl', function ($scope, $q, $routeParams, pga, Team) {

    //initialize data
    $q.all([
      pga.getSetup()
    ]).then(
      function(results){
        $scope.tournament = results[0].data;
      },
      function(error){
        $scope.teamError = error;
      }
    );


  }
);
