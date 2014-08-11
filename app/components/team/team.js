'use strict';

angular.module('fantasyGolfApp')
  .controller('TeamCtrl', function ($scope, $q, Auth, pga, Team) {

    $scope.init = function(){

      $q.all([
          Team.get({id: $scope.currentUser.teamId}).$promise,
          pga.getField().$promise,
          pga.setup().$promise
        ])
        .then(function(result) {

          $scope.team = result[0];
          $scope.field = result[1];

          $scope.event = result[2].event;
          $scope.courses = result[2].courses;

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

          $scope.setActivePlayers();

        });
    };

    //save team
    $scope.saveTeam = function(team){

      //add user id
      team.userId = $scope.currentUser.userId;

      team.players = team.players.map(function(player){
        return player._id;
      });


      Team.update(team,
        function(team){

          //update team
          $scope.team = team;

          //reset form
          $scope.TeamForm.$setPristine();
          $scope.updated = true;
          $scope.showSettings = false;
        },
        function(error){$scope.teamerror = error;}
      )

    };

    $scope.addPlayer = function(playerId){

      Team.add({},
        {
          playerId: playerId,
          teamId: $scope.currentUser.teamId
        },
        function(){

          //add player to team
          $scope.team.players.push({_id: playerId});

          //reset field list
          $scope.setActivePlayers()

        },
        function(error){
          //modal?
          console.log('error!' +error);
        });

    };

    $scope.dropPlayer = function(playerId){

      Team.drop({},
        {
          playerId: playerId,
          teamId: $scope.currentUser.teamId
        },
        function(){

          //remove player from team
          angular.forEach($scope.team.players, function(player, index){
            if(player._id == playerId){
              $scope.team.players.splice(index, 1);
            }
          });

          //reset league list
          $scope.setActivePlayers();

        },
        function(error){
          //modal?

          console.log('error!' + error);
        });

    };

    $scope.setActivePlayers = function(){

      //loop through player in field
      angular.forEach($scope.field, function(fieldPlayer, fieldIndex){

        fieldPlayer.active = false;

        //loop through player in field
        angular.forEach($scope.team.players, function(teamPlayer){
          if(teamPlayer._id == fieldPlayer._id){
            $scope.field[fieldIndex].active  = true;
          }
        });

      });

      $scope.emptyPlayerSlots = [];
      while(($scope.team.players.length + $scope.emptyPlayerSlots.length) < 4){
        $scope.emptyPlayerSlots.push({})
      }


      $scope.addPlayerDisabled = ($scope.team.players.length > 3)

    };



    //init data
    $scope.init();
  });


