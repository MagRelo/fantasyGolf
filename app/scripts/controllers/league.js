'use strict';

angular.module('fantasyGolfApp')
  .controller('LeagueCtrl', function ($scope, leagueModel, teamModel) {

    //get leagues list
    leagueModel.leagues().then(function(data){
      $scope.leagues = data;
    });

    //get team data
    if($scope.currentUser.teamId){
      teamModel.getTeam($scope.currentUser.teamId).then(function(data){
        $scope.team = data;
      });
    }

    $scope.createLeague = function(){

      //add owner id
      $scope.league.ownerUserId = $scope.currentUser.userId;

      //add users property and add owner
      $scope.league.teams = [];
      $scope.league.teams.push($scope.currentUser.teamId);

      //create league
      leagueModel.saveLeague(null, $scope.league).then(function(leagues){

        //update leagues list
        $scope.leagues = leagues;

        //reset form
        $scope.LeagueForm.$setPristine();
        $scope.league = {};
      });

    };

    $scope.joinLeague = function(index){

      leagueModel.joinLeague(index, $scope.currentUser.teamId);

    };

  });
