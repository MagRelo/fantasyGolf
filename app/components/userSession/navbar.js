'use strict';

angular.module('fantasyGolfApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {

    $scope.menu = [
    {
      'title': 'leagues',
      'link': '/leagues'
    }, {
      'title': 'team',
      'link': '/team'
    }, {
      'title': 'leaderboard',
      'link': '/leaderboard'
    },{
        'title': 'settings',
        'link': '/settings'
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
