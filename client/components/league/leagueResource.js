'use strict';

angular.module('fantasyGolfApp')
  .factory('League', function ($http, promiseCache) {

    return {
      listLeagues: function () {
        return promiseCache({
          promise: function () {
            return $http.get('/api/league/');
          },
          ttl: 3600000,
          bustCache: false,
          key: 'listLeagues'
        });
      },
      getLeague: function (leagueId) {
        return promiseCache({
          promise: function () {
            return $http.get('/api/league/' + leagueId);
          },
          ttl: 30000
        });
      },
      createLeague: function(newLeague){
        promiseCache.remove('listLeagues', false);
        return $http.post('/api/league/', newLeague);
      },
      updateLeague: function(leagueId, league){
        //bust cache
        promiseCache.remove('listLeagues', false);
        return $http.put('/api/league/' + leagueId, league);
      },
      deleteLeague: function(leagueId){
        return $http.del('/api/league/' + leagueId);
      },
      joinLeague: function(leagueId, teamId){
        promiseCache.remove('getTeam', false);
        promiseCache.remove('listLeagues', false);
        return $http.put('/api/league/join', {leagueId: leagueId, teamId: teamId});
      },
      leaveLeague: function(leagueId, teamId){
        promiseCache.remove('getTeam', false);
        promiseCache.remove('listLeagues', false);
        return $http.put('/api/league/leave', {leagueId: leagueId, teamId: teamId});
      },
      addChat: function(message, leagueId, teamId){
        promiseCache.remove('getTeam', false);
        return $http.put('/api/league/chat', {message: message, leagueId: leagueId, teamId: teamId});
      }
    };


  });
