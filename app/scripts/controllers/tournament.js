'use strict';

angular.module('fantasyGolfApp')
  .controller('TournamentCtrl', function ($scope, teamModel, pga, tournamentModel) {

    //1. Display Tournament info
    tournamentModel.tournamentInfo().then(function(data){
      $scope.tournament = data;
      $scope.players = [];
      //loop through players
      angular.forEach(data.players, function(player, index){

        var modStablefordTotal = 0;
        var stablefordTotal = 0;
        var standardTotal = 0;

        //loop through holes
        for(var j = 0 ; j < player.h.h.length; j++ ){

          var score = player.h.h[j].sc;
          var par = $scope.tournament.courses[0].h[j].p;
          var modstable = 0;
          var stable = 0;

          if(score == '--'){
            modstable = '--';
            stable = '--';}
          else{

            var diff = score - par;

            //modStable
            if(diff > 1){modstable = -3}
            else if (diff == 1 ){modstable = -1}
            else if (diff == 0 ){modstable = 0}
            else if (diff == -1){modstable = 2}
            else if (diff == -2){modstable = 5}
            else if (diff < -2 ){modstable = 8}

            //Stable
            if(diff > 1){stable = 0}
            else if (diff == 1 ){stable = 1}
            else if (diff == 0 ){stable = 2}
            else if (diff == -1){stable = 3}
            else if (diff == -2){stable = 4}
            else if (diff == -3){stable = 5}
            else if (diff >  -3){stable = 6}

            standardTotal = standardTotal + Number(score);
            stablefordTotal =  stablefordTotal + stable;
            modStablefordTotal = modStablefordTotal + modstable;
          }

          player.h.h[j].stable =  stable;
          player.h.h[j].modstable =  modstable;
        }

        player.sc =  standardTotal;
        player.stable =  stablefordTotal;
        player.modstable = modStablefordTotal;

        $scope.players.push(player);

      });

      //2. Display Team Info
      if($scope.currentUser.teamId){
        teamModel.getTeam($scope.currentUser.teamId).then(function(data){

          $scope.team = data;
          $scope.team.players = [];

          angular.forEach($scope.players, function(tourneyPlayer){

            if(tourneyPlayer.id == $scope.team.player1
              || tourneyPlayer.id == $scope.team.player2
              || tourneyPlayer.id == $scope.team.player3
              || tourneyPlayer.id == $scope.team.player4){

              $scope.team.players.push(tourneyPlayer)

            }

          })

        });
      }

    });


    //3.Display User Leagues
    $scope.userLeagues = $scope.currentUser.leagues;

  });
