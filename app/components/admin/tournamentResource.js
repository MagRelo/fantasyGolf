'use strict';

angular.module('fantasyGolfApp')
  .factory('Tournament', function ($http, promiseCache) {

    return {
      getTournament: function () {
        return promiseCache({
          promise: function () {
            return $http.get('/api/pga/setup');
          },
          ttl: 900000
        });
      },
      getPlayers: function () {
        return promiseCache({
          promise: function () {
            return $http.get('/api/pga/field');
          },
          ttl: 900000
        });
      },
      updateTournament: function(tournamentId, tournament){
        //bust cache
        //promiseCache.remove('listTournaments', false);
        return $http.put('/api/tournament/' + tournamentId, tournament);
      },
      deleteTournament: function(tournamentId){
        return $http.del('/api/tournament/' + tournamentId);
      },
      runSetup: function(){
        return $http.post('/api/admin/setup');
      },
      refreshSetup: function(){
        return $http.post('/api/admin/refreshsetup');
      },
      calcPlayers: function(){
        return $http.post('/api/admin/calcplayers');
      },
      calcTeams: function(){
        return $http.post('/api/admin/calcteams');
      },
      calcLeagues: function(){
        return $http.post('/api/admin/calcleagues');
      },
      listUsers: function(){
        return $http.get('/api/admin/users');
      },
      deleteUser: function(userId){
        return $http.delete('/api/admin/users/' + userId);
      }
    };


  });

