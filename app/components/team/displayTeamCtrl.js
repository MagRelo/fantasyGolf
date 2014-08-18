'use strict';

angular.module('fantasyGolfApp')
  .controller('displayTeamCtrl', function ($scope, $q, pga, Team) {

    var userTeamId = $scope.currentUser.teamId;
    $scope.rounds = [];

    $q.all([

      Team.getTeam(userTeamId),
      pga.getSetup()

    ]).then(
      function(results){

        $scope.team = results[0].data;
        $scope.event = results[1].data.event;
        $scope.courses = results[1].data.courses;

        //setup table header (rounds)
        if($scope.event.currentRnd){
          while($scope.event.currentRnd > $scope.rounds.length){
            $scope.rounds.push({number: ($scope.rounds.length + 1) })
          }
        }

        //pad out rounds for player that missed the cut
        angular.forEach([$scope.team.player1, $scope.team.player2, $scope.team.player3, $scope.team.player4],
          function(playerData){
            if(playerData.rounds){
              while(playerData.rounds.length < $scope.event.currentRnd){
                playerData.rounds.push({
                  sc: '--',
                  stable: '--',
                  modstable: '--'
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
