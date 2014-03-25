'use strict';

angular.module('fantasyGolfApp')
  .service('Leagues', function Leagues() {
    // AngularJS will instantiate a singleton by calling "new" on this function

    this.leagues = [
      {name: 'league 1'},
      {name: 'league 2'},
      {name: 'league 3'},
      {name: 'league 4'},
      {name: 'league 5'},
      {name: 'league 6'},
      {name: 'league 7'}
    ];

  });
