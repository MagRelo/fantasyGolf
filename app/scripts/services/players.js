'use strict';

angular.module('fantasyGolfApp')
  .service('Players', function Players() {
    // AngularJS will instantiate a singleton by calling "new" on this function

    this.players = [
      {'name': 'Jim'},
      {'name': 'Bill'},
      {'name': 'Ted'},
      {'name': 'Ace'},
      {'name': 'Duece'},
      {'name': 'Roger'},
      {'name': 'Troy'},
      {'name': 'Mike'},
      {'name': 'John'},
      {'name': 'Phil'},
      {'name': 'Dick'},
      {'name': 'Cletus'},
      {'name': 'Toby'},
      {'name': 'Rip'},
      {'name': 'Wink'},
      {'name': 'Chuck'},
      {'name': 'Martin'}
    ];

    return this;

  });
