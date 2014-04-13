'use strict';

angular.module('fantasyGolfApp')
  .controller('TeamCtrl', function ($scope, $q, Auth, pga, Team, League) {

    $scope.init = function(){

      $q.all([
          League.query().$promise,
          Team.get({id: $scope.currentUser.teamId}).$promise,
          pga.setup().$promise
        ])
        .then(function(result) {

          //set results to scope
          $scope.leagues = result[0];
          $scope.team = result[1];
          $scope.field = result[2].field;

          //loop through leagues
          angular.forEach($scope.leagues, function(league){

            //check for teams(remove?)
            if(league.teams){

              //check for team id of current user, mark league as active
              league.active = (league.teams.indexOf($scope.currentUser.teamId) > -1);
            }

          });
        });
    };

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


    //init data
    $scope.init();
  });
