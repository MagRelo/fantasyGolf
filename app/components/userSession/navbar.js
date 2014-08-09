'use strict';

angular.module('fantasyGolfApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {

    $scope.menu = [
    {
      'title': 'My Leagues',
      'link': '/league'
    }, {
      'title': 'My Team',
      'link': '/team'
    }, {
      'title': 'Settings',
      'link': '/setup'
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
