'use strict';

angular.module('fantasyGolfApp')
  .controller('LeagueCtrl', function ($scope, $q, League, Team) {

    $scope.init = function(){

      $q.all([
        League.query().$promise,
        Team.get({id: $scope.currentUser.teamId}).$promise
      ])
      .then(function(result) {
        //set results to scope
        $scope.leagues = result[0];
        $scope.team = result[1];

          //if(team.leagues){
          //  mark league as 'joined'
          // }

      })
    };

    $scope.init();

    $scope.joinLeague = function(index){

      //League.update(index, $scope.currentUser.teamId);

    };

    $scope.createLeague = function(){

      //add owner id
      $scope.league.teamId = $scope.currentUser.teamId;

      //add users property and add owner
      $scope.league.teams = [];
      $scope.league.teams.push($scope.currentUser.teamId);

      //create league
      var newLeague = new League($scope.league);
      newLeague.$save({},
        function(leagues){

        //update leagues list
        $scope.leagues = leagues;

        //reset form
        $scope.LeagueForm.$setPristine();
        $scope.league = {};
      });

    };

  });
