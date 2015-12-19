'use strict';

/**
 * @ngdoc function
 * @name phundusApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('LogoutCtrl', ['$scope', '$location', '$window', 'Auth', 'Alert',
    function ($scope, $location, $window, Auth, Alert) {

      if (Auth.isLoggedIn) {
        Auth.logout(function () {
            $location.path('/goodbye');
          },
          function (err) {
            Alert.error(err);
          });
      }
      else {
        $location.path('/goodbye');
      }
    }]);
