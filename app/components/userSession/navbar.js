'use strict';

angular.module('fantasyGolfApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {

    $scope.menu = [
    {
      'title': 'leagues',
      'link': '/leagues'
    }, {
      'title': 'my team',
      'link': '/myteam'
    }, {
      'title': 'leaderboard',
      'link': '/leaderboard'
    }, {
      'title': 'admin',
      'link': '/admin'
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
