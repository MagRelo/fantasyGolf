'use strict';

angular.module('fantasyGolfApp')
  .controller('TeamCtrl', function ($scope, Auth, Players) {

    //select players list
    $scope.players = Players.players;

    //team settings
    $scope.user = Auth.currentUser();

    $scope.updateTeam = function(){

      var team = {
        Team_Name:  $scope.user.Team_Name,
        Owner_Name: $scope.user.Owner_Name,
        Player_1:   $scope.user.Player_1,
        Player_2:   $scope.user.Player_2,
        Player_3:   $scope.user.Player_3,
        Player_4:   $scope.user.Player_4
      };

      Auth.updateTeam(team, function(){
        $scope.TeamForm.$setPristine();
        $scope.updated = true;
      });

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
