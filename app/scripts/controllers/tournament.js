'use strict';

angular.module('fantasyGolfApp')
  .controller('TournamentCtrl', function ($scope,$q, pga, Team) {

    //load data
    $scope.init = function() {

      return $q.all([
          pga.setup().$promise,
          Team.get({id: $scope.currentUser.teamId}).$promise

        ])
        .then( function(result) {

          //set results to scope
          $scope.event = result[0].event;
          $scope.courses = result[0].courses;
          $scope.field = result[0].field;
          $scope.team = result[1];

          //setup table header (rounds)
          $scope.rounds = [];
          while($scope.rounds.length < $scope.event.currentRnd){
            $scope.rounds.push({number: ($scope.rounds.length + 1) })
          }

          //pad out rounds for player that missed the cut
          angular.forEach($scope.team.players, function(playerData){
            while(playerData.rounds.length < $scope.event.currentRnd){
              playerData.rounds.push({
                sc: '--',
                stable: '--',
                modstable: '--'
              })
            }
          });

        })
    };

    $scope.init();

  });
