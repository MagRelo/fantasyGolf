'use strict';

angular.module('fantasyGolfApp')
  .controller('displayTeamCtrl', function ($scope, $q, $routeParams, pga, Team) {

    var totalRounds;
    var teamId = $routeParams.teamId || $scope.currentUser.teamId;
    $scope.rounds = [];

    $q.all([

      Team.displayTeam(teamId),
      pga.getSetup()

    ]).then(
      function(results){

        $scope.team = results[0].data;


        $scope.courses = results[1].data.courses;

        totalRounds = results[1].data.totalRounds;

        //setup table header (rounds)
        if(totalRounds){
          while(totalRounds > $scope.rounds.length){
            $scope.rounds.push({number: ($scope.rounds.length + 1) })
          }
        }

        //pad out rounds for player that missed the cut
        angular.forEach([$scope.team.player1, $scope.team.player2, $scope.team.player3, $scope.team.player4],
          function(playerData){
            if(playerData){
              while(playerData.rounds.length < totalRounds){
                playerData.rounds.push({
                  modStablefordTotal: ''
                })
              }
            }
        });

      },
      function(error){
        $scope.teamError = error;
      }
    );

  }
);
