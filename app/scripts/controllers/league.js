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

          //loop through leagues
          angular.forEach($scope.leagues, function(league){

            //check for teams(remove?)
            if(league.teams){

              //check for team id of current user, mark league as active
              league.active = (league.teams.indexOf($scope.currentUser.teamId) > -1);
            }

          });
      });
    };

    $scope.createLeague = function(){

      var newLeague = new League();

      //add owner id
      newLeague.teamId = $scope.currentUser.teamId;
      newLeague.leagueName = $scope.league.leagueName;
      newLeague.location = $scope.league.leagueLocation;

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

    $scope.joinLeague = function(leagueId){


      League.join({},
        {
          leagueId: leagueId,
          teamId: $scope.currentUser.teamId
        },
        function(data){

          //update all
          $scope.init();
        },
        function(error){});

    };

    $scope.leaveLeague = function(leagueId){


      League.leave({},
        {
          leagueId: leagueId,
          teamId: $scope.currentUser.teamId
        },
        function(data){

          //update all
          $scope.init();
        },
        function(error){});

    };

  //    $scope.init();

  });
