'use strict';

angular.module('fantasyGolfApp')
  .controller('NavbarCtrl', function ($rootScope, $scope, $location, Auth) {

    //var userIsLoggedIn = !!$scope.currentUser;
    var userIsLoggedIn = true;

    if(userIsLoggedIn){
      $scope.menu = [
        { 'title': 'Settings', 'link': '/settings', 'icon': 'glyphicon glyphicon-cog' }
      ];
    }

    //add admin link if admin
    //if(userIsLoggedIn  && $scope.currentUser.role === 'admin'){
    //  $scope.menu.push(
    //    {'title': 'admin', 'link': '/admin'}
    //  )
    //}

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    //Close nav after link selected
    $rootScope.$on('$routeChangeSuccess', function (event, next) {
      $scope.navCollapsed = true;
    });

    $scope.logout = function() {
      Auth.logout()
        .then(function() {
          $location.path('/');
        });
    };

  });
