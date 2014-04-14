'use strict';

angular.module('fantasyGolfApp')
  .controller('TeamCtrl', function ($scope, $q, Auth, pga, Team, League) {

    $scope.init = function(){

      $q.all([
          League.query().$promise,
          Team.get({id: $scope.currentUser.teamId}).$promise,
          pga.getField().$promise
        ])
        .then(function(result) {

          //process leagues
          $scope.leagues = result[0];
          angular.forEach($scope.leagues, function(league){
            if(league.teams){

              //check for team id of current user, mark league as active
              league.active = (league.teams.indexOf($scope.currentUser.teamId) > -1);
            }
          });

          //process team
          $scope.team = result[1];
          if(!$scope.team.players){
            $scope.team.players = [];
          }
          while($scope.team.players.length < 4){
            $scope.team.players.push({});
          }

          //process field
          $scope.field = result[2];

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
