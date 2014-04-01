'use strict';

angular.module('fantasyGolfApp')
  .controller('TournamentCtrl', function ($scope, teamModel, pga, Team) {

    //1. Display Tournament info
    pga.setup({},
      function(data){
        $scope.event = data.event;
        $scope.players = data.field;
        $scope.courses = data.courseInfos;
      },
      function(error){ $scope.error = error; }
    );

    //2. Display Team Info
    Team.get({id: $scope.currentUser.teamId},
      function(data){
        $scope.team = data;
      },
      function(error){ $scope.error = error; }
    );

    //3.Display User Leagues
    $scope.userLeagues = $scope.currentUser.leagues;

  });
