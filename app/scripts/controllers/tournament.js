'use strict';

angular.module('fantasyGolfApp')
  .controller('TournamentCtrl', function ($scope, teamModel, pga, Team) {


    //2. Get Team Info
    Team.get({id: $scope.currentUser.teamId},
      function(data){
        $scope.team = data;


        //1. Get Tournament info
        pga.setup({},
          function(data){
            $scope.event = data.event;
            $scope.courses = data.courseInfos;
            $scope.players = data.field;


            //loop through team players
            angular.forEach($scope.team.players, function(teamPlayer, teamIndex){

              //loop through field players
              angular.forEach(data.field, function(fieldPlayer){

                if(teamPlayer.pgaId == fieldPlayer.id){
                  angular.extend($scope.team.players[teamIndex], fieldPlayer);
                }

              });

            });

          },
          function(error){ $scope.error = error; }
        );


      },
      function(error){ $scope.error = error; }
    );

    //3.Display User Leagues
    $scope.userLeagues = $scope.currentUser.leagues;

  });
