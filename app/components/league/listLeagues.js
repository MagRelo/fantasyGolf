'use strict';

angular.module('fantasyGolfApp')
  .controller('listLeaguesCtrl', function ($scope, $q, $firebase, League) {

    League.listLeagues()
      .then(function(result) {
        $scope.leagues = result.data;

      },function(error){
        $scope.error = error;
      });

  });
