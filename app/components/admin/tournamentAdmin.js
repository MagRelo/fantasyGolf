'use strict';

angular.module('fantasyGolfApp')
  .controller('tournamentAdminCtrl', function ($scope, Tournament) {

    Tournament.getTournament()
      .then(function(){

      }, function(){

      })

  });