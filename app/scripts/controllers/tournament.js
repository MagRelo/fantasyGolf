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
          $scope.courses = result[0].courseInfos;
          $scope.field = result[0].field;
          $scope.team = result[1];

          //setup team totals
          $scope.team.sc = 0;
          $scope.team.stable = 0;
          $scope.team.modstable = 0;

          //break if the players are not setup
          if(!$scope.team.players.length > 0){
            return;
          }

          //extend field data to each team player
          angular.forEach($scope.team.players, function(teamPlayer, index){
            angular.forEach($scope.field, function(fieldPlayer){
              if(teamPlayer.pgaId == fieldPlayer.id){
                angular.extend($scope.team.players[index], fieldPlayer);
              }
            });
          });

          //get player records and then extend each one onto team.player object
          $q.all([
              pga.get({playerId: $scope.team.players[0].pgaId}).$promise,
              pga.get({playerId: $scope.team.players[1].pgaId}).$promise,
              pga.get({playerId: $scope.team.players[2].pgaId}).$promise,
              pga.get({playerId: $scope.team.players[3].pgaId}).$promise
            ])
            .then( function(result) {
              angular.forEach(result, function(playerData, index){

                //pad out rounds for player that missed the cut
                while(playerData.rounds.length < $scope.event.currentRnd){
                  playerData.rounds.push({
                    sc: '--',
                    stable: '--',
                    modstable: '--'
                  })
                }

                //total up scores
                $scope.team.sc += playerData.sc;
                $scope.team.stable += playerData.stable;
                $scope.team.modstable += playerData.modstable;

                angular.extend($scope.team.players[index], playerData);

              });
            })
        })
    };


    $scope.init();

  });
