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

      $rootScope.error = '';
      $rootScope.warn = '';

      $scope.rememberMe = true;
      $scope.login = function() {

        Auth.login({
            username: $scope.username,
            password: $scope.password,
            rememberme: $scope.rememberMe
          },
          function() {
            var path = $location.search().returnUrl || '/debug';
            delete $location.search().returnUrl;
            $location.path(path);
          },
          function() {
            $rootScope.error = "Failed to login.";
          });
        };
    }]);
