'use strict';

angular.module('fantasyGolfApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Tournament',
      'link': '/tournament'
    }, {
      'title': 'My Team',
      'link': '/team'
    }, {
      'title': 'My Leagues',
      'link': '/league'
    }];
    
    $scope.logout = function() {
      Auth.logout()
      .then(function() {
        $location.path('/');
      });
    };
    
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
