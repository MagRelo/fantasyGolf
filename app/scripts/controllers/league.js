'use strict';

angular.module('fantasyGolfApp')
  .controller('LeagueCtrl', function ($rootScope, $scope, leagueModel) {

    //get leagues list
    leagueModel.leagues().then(function(data){
      $scope.leagues = data;
    });

    $scope.createLeague = function(){

      //add owner id
      $scope.league.ownerUserId = $scope.currentUser.userId;

      //add users property and add owner
      $scope.users = [];
      $scope.league.users.push($scope.currentUser.userId);

      //create league
      leagueModel.saveLeague(null, $scope.league).then(function(leagues){

        //update leagues list
        $scope.leagues = leagues;

        //reset form
        $scope.LeagueForm.$setPristine();
        $scope.league = {};
      });

    };

    $scope.joinLeague = function(league){

      leagueModel.joinLeague(league, $scope.currentUser.userId).then(function(){

        //update leagues list
        //$scope.leagues = leagues;

      });


    };

  });
