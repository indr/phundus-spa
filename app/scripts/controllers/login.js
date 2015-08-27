'use strict';

/**
 * @ngdoc function
 * @name phundusApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('LoginCtrl', ['$rootScope', '$scope', '$location', 'Auth',
    function($rootScope, $scope, $location, Auth) {

      $scope.rememberMe = true;
      $scope.login = function() {
        Auth.login({
            username: $scope.username,
            password: $scope.password,
            rememberMe: $scope.rememberMe
          },
          function() {
            $location.path('/');
          },
          function(err) {
            $rootScope.error = "Failed to login: " + err;
          });
        };
    }]);
