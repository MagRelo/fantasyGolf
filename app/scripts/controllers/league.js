'use strict';

angular.module('fantasyGolfApp')
  .controller('LeagueCtrl', function ($scope, Leagues, Auth) {

    $scope.user = Auth.currentUser();

    $scope.leagues = Leagues.leagues;



  });
