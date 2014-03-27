'use strict';

angular.module('fantasyGolfApp')
  .controller('TournamentCtrl', function ($scope, League) {

    //list user leagues
    $scope.userLeagues = $scope.currentUser.leagues;

    //get list of all leagues
    //$scope.leagueList = League.query();

  });
