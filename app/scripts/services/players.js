'use strict';

angular.module('fantasyGolfApp')
  .service('Players', function Players(pga) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    this.players = [];

    this.refreshPlayers = function(){
       return pga.get().$promise.then(function(response){
         this.players = response.players;

         return this.players;
      });
    };

    this.listPlayers = function(){
      if (this.players.length < 1){
        return this.refreshPlayers()
      }
    };


    return this;

  });
