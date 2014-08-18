'use strict';

angular.module('fantasyGolfApp')
  .controller('editTeamCtrl', function ($scope, $q, pga, Team) {

    $q.all([

      Team.getTeam($scope.currentUser.teamId),
      pga.getField()

    ])
      .then(function(result){

        //Team.getTeam()
        $scope.team = result[0].data;

        //pga.getField()
        $scope.field = result[1].data;

      });


    //save team
    $scope.saveTeam = function(team){

      //add user id
      team.userId = $scope.currentUser.userId;

      team.players = team.players.map(function(player){
        return player._id;
      });


      Team.updateTeam(team, team._id)
        .then(
        function(response){

          //update team
          $scope.team = response.data;

          //reset form
          $scope.TeamForm.$setPristine();
          $scope.updated = true;
          $scope.showSettings = false;
        },
        function(error){$scope.teamerror = error;}
      )

    };


  });
