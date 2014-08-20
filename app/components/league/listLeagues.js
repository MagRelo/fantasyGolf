'use strict';

angular.module('fantasyGolfApp')
  .controller('listLeaguesCtrl', function ($scope, Team) {


    var teamId = $scope.currentUser.teamId;

    Team.getTeam(teamId)
      .then(function(result){
        $scope.team = result.data;
      },function(error){
        $scope.error = error;
      }
    );
//
//    League.listLeagues()
//      .then(function(result) {
//        $scope.leagues = result.data;
//
//      },function(error){
//        $scope.error = error;
//      });

  });
