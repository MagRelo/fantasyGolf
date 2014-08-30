'use strict';

angular.module('fantasyGolfApp')
  .controller('editTeamCtrl', function ($scope, $q, pga, Team) {

    $q.all([
      Team.getMyTeam($scope.currentUser.teamId),
      pga.getField()
    ])
      .then(function(result){

        //copy object to break binding to allow cancel
        $scope.team = angular.copy(result[0].data);

        //get field for player drop downs
        $scope.field = result[1].data;
      });


    //save team
    $scope.saveTeam = function(team){

      //add user id
      team.userId = $scope.currentUser.userId;

      Team.updateTeam(team, team._id)
        .then(
          function(response){

            //update team
            $scope.team = angular.copy(response.data);

            //reset form
            $scope.TeamForm.$setPristine();
            $scope.updated = true;
            $scope.showSettings = false;
          },
          function(error){$scope.teamError = error;}
      )

    };

    $scope.cancel = function(){

      Team.getTeam($scope.currentUser.teamId)
        .then(
          function(result){
            $scope.team = angular.copy(result.data);
            $scope.TeamForm.$setPristine();
            $scope.updated = false;
          },
          function(error){$scope.teamError = error;}
      )

    };

  });
