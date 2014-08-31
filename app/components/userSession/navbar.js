'use strict';

angular.module('fantasyGolfApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {

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
