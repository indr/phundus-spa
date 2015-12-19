'use strict';

/**
 * @ngdoc function
 * @name phundusApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('LoginCtrl', ['$scope', '$location', '$window', 'Auth', 'Alert',
    function ($scope, $location, $window, Auth, Alert) {

      $scope.rememberMe = true;
      $scope.login = function () {

        Auth.login({
            username: $scope.username,
            password: $scope.password,
            rememberme: $scope.rememberMe
          },
          function () {
            var returnUrl = $location.search().ReturnUrl;
            if (returnUrl) {
              $window.location.href = returnUrl;
            }
            else {
              //var returnPath = $location.search().returnPath || '/users/' + data.userId;
              var returnPath = $location.search().returnPath || '/';

              delete $location.search().returnPath;
              $location.path(returnPath);
            }
          },
          function () {
            Alert.error("Das angegebene Passwort ist nicht korrekt.");
          });
      };
    }]);
