'use strict';

angular.module('fantasyGolfApp')
  .controller('TeamCtrl', function ($rootScope, $scope, $location, Auth, tournamentModel, teamModel) {

    //get tournament info data
    tournamentModel.tournamentInfo().then(function(data){
      $scope.tournament = data;
    });

    //get team data
    if($scope.currentUser.teamId){
      teamModel.getTeam($scope.currentUser.teamId).then(function(data){
        $scope.team = data;
      });
    }

    //save team
    $scope.saveTeam = function(team){

      //add user id
      team.userId = $scope.currentUser.userId;

      //process player inputs into an array
      team.players = [];
      team.players.push(team.player1);
      team.players.push(team.player2);
      team.players.push(team.player3);
      team.players.push(team.player4);

      //save
      teamModel.saveTeam(team._id, team)
        .then(function(team){

          //update team
          $scope.team = team;

          //reset form
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
