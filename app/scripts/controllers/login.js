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
            port: ':8000',
            username: $scope.username,
            password: $scope.password,
            rememberme: $scope.rememberMe
          },
          function() {
            $location.path('/debug/');
          },
          function(err) {
            $rootScope.error = "Failed to login: " + err;
          },
          function(warn) {
            $rootScope.warn = "Failed to login: " + warn;
          });
        };
    }]);
