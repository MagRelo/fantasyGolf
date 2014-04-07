'use strict';

angular.module('fantasyGolfApp')
  .controller('TeamCtrl', function ($scope, $location, Auth, pga, Team) {

    //1. Display Tournament info
    pga.setup({},
      function(data){
        //$scope.event = data.event;
        $scope.field = data.field;
        //$scope.courses = data.courseInfos;
      },
      function(error){ $scope.setuperror = error; }
    );

    //2. get team data
    Team.get({id: $scope.currentUser.teamId},
      function(data){

        //initialize players if < 4 are present
        if(!data.players){data.players = []}
        while(data.players.length < 4){
          data.players.push({})
        }

        $scope.team = data;
      },
      function(error){ $scope.teamerror = error; }
    );

    //save team
    $scope.saveTeam = function(team){

      //add user id
      team.userId = $scope.currentUser.userId;

      Team.update(team,
        function(team){

          //update team
          $scope.team = team;

          //reset form
          $scope.TeamForm.$setPristine();
          $scope.updated = true;
        },
        function(error){ $scope.teamerror = error; }
      )

    };

    //Account Settings
    $scope.errors = {};
    $scope.changePassword = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )

          .then( function() {
            $scope.message = 'Password successfully changed.';
          })

          .catch( function() {
            form.password.$setValidity('mongoose', false);
            $scope.errors.other = 'Incorrect password';
          });
      }
    };
  });
