'use strict';

angular.module('fantasyGolfApp')
  .controller('LeagueCtrl', function ($rootScope, $scope, League) {

    //list user leagues
    $scope.userLeagues = $scope.currentUser.leagues;

    $scope.createLeague = function(league){

      //add user id
      league.ownerUserId = $scope.currentUser.userId;

      //create
      var newLeague = new League(league);

      //save
      newLeague.$save(function(response){
        //        $scope.team = response.league;
        $rootScope.currentUser = response.user;
        $scope.LeagueForm.$setPristine();
      });

    };

  });
