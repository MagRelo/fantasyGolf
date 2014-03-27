'use strict';

angular.module('fantasyGolfApp')
  .controller('LeagueCtrl', function ($rootScope, $scope, leagueModel) {

    //get team data
    leagueModel.leagues($scope.currentUser.teamId).then(function(data){
      $scope.leagues = data;
    });

    $scope.createLeague = function(league){

      //add user id
      league.ownerUserId = $scope.currentUser.userId;

      //create
      var newLeague = new League(league);

      //save
      newLeague.$save(function(response){
        $rootScope.currentUser = response.user;
        $scope.League = {};
        $scope.LeagueForm.$setPristine();
      });

    };

  });
