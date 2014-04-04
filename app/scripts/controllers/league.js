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



    $scope.joinLeague = function(index){

      //League.update(index, $scope.currentUser.teamId);

    };

    $scope.createLeague = function(){

      var newLeague = new League();

      //add owner id
      newLeague.teamId = $scope.currentUser.teamId;
      newLeague.leagueName = $scope.league.leagueName;
      newLeague.location = $scope.league.location;

      //add users property and add owner
      newLeague.teams = [];
      newLeague.teams.push($scope.currentUser.teamId);

      //create league
      newLeague.$save({},
        function(){

        //update all
        $scope.init();

        //reset form
        $scope.LeagueForm.$setPristine();
        $scope.league = {};
      });

    };

    $scope.init();

  });
