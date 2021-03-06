'use strict';

angular.module('fantasyGolfApp')
  .controller('SignupCtrl', function ($scope, Auth, $location) {
    $scope.user = {};
    $scope.errors = {};

    $scope.register = function(form) {
      $scope.submitted = true;

      var userEmail = $scope.user.email.toLowerCase();

      if(form.$valid) {
        Auth.createUser({
          name: $scope.user.name,
          email: userEmail,
          password: $scope.user.password
        })
        .then( function() {
          // Account created, redirect to home
          $location.path('/editteam');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.type;
          });
        });
      }
    };
  });