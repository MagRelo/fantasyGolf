'use strict';

angular.module('fantasyGolfApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {

    $scope.menu = [{
      'title': 'Tournament',
      'link': '/tournament'
    }, {
      'title': 'Team',
      'link': '/team'
    }, {
      'title': 'League',
      'link': '/league'
    }, {
      'title': 'Setup',
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
