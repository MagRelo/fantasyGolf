'use strict';

angular.module('fantasyGolfApp')
  .controller('LeagueCtrl', function ($scope, $q, $firebase, League) {

    var firebaseRef = new Firebase('https://ballstrikers.firebaseio.com/chat');

    // create an AngularFire reference to the data
    var sync = $firebase(firebaseRef);

    $scope.init = function(){

      League.query().$promise.then(function(result) {
        $scope.leagues = $scope.setActiveLeagues(result, $scope.currentUser.teamId);
      });

      // download the data into a local object
      $scope.chat = sync.$asObject();

    };

    $scope.createLeague = function(){

      var newLeague = new League();

      //add owner id
      newLeague.teamId = $scope.currentUser.teamId;
      newLeague.leagueName = $scope.league.leagueName;
      newLeague.location = $scope.league.leagueLocation;

      //add users property and add owner
      newLeague.teams = [];
      newLeague.teams.push($scope.currentUser.teamId);

      //create league
      League.create(newLeague,
        function(response){

          //reset league list
          $scope.leagues = $scope.setActiveLeagues(response, $scope.currentUser.teamId);

          //reset form
          $scope.LeagueForm.$setPristine();
          $scope.league = {};
        });

    };

    $scope.joinLeague = function(leagueId){


      League.join({},
        {
          leagueId: leagueId,
          teamId: $scope.currentUser.teamId
        },
        function(data){
          //reset league list
          $scope.leagues = $scope.setActiveLeagues(data, $scope.currentUser.teamId);
        },
        function(error){
          //modal?
        });

    };

    $scope.leaveLeague = function(leagueId){

      League.leave({},
        {
          leagueId: leagueId,
          teamId: $scope.currentUser.teamId
        },
        function(data){
          //reset league list
          $scope.leagues = $scope.setActiveLeagues(data, $scope.currentUser.teamId);
        },
        function(error){
          //modal?
        });

    };

    $scope.setActiveLeagues = function(leagues, teamId){

      //loop through each league
      angular.forEach(leagues, function(league){
        if(league.teams){
          league.active = false;

          //loop through each team in the league
          league.teams.forEach(function(team){
            if(team._id == teamId){
              league.active = true;
            }
          });
        }
      });

      return leagues;
    };

    $scope.init();
  });
