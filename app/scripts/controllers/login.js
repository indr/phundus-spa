'use strict';

/**
 * @ngdoc function
 * @name phundusApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('LoginCtrl', ['$rootScope', '$scope', '$location', '$window', 'Auth',
    function ($rootScope, $scope, $location, $window, Auth) {

      $scope.rememberMe = true;
      $scope.login = function () {

        Auth.login({
            username: $scope.username,
            password: $scope.password,
            rememberme: $scope.rememberMe
          },
          function (data) {
            var returnUrl = $location.search().ReturnUrl;
            if (returnUrl) {
              $window.location.href = returnUrl;
            }
            else {
              var returnPath = $location.search().returnPath || '/users/' + data.userId;
              delete $location.search().returnPath;
              $location.path(returnPath);
            }
          },
          function () {
            $rootScope.showError("Failed to login.");
          });
      };
    }]);
