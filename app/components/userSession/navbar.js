'use strict';

angular.module('fantasyGolfApp')
  .controller('NavbarCtrl', function ($rootScope, $scope, $location, Auth) {

    $scope.menu = [
      { 'title': 'leagues', 'link': '/leagues' }
      ,{ 'title': 'my team', 'link': '/myteam' }
      ,{ 'title': 'leaderboard', 'link': '/leaderboard' }
    ];

    //add admin link
    var addAdmin = function(){
      if($scope.currentUser.role === 'admin'){
        $scope.menu.push(
          {'title': 'admin', 'link': '/admin'}
        )
      }
    };
    addAdmin();

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
