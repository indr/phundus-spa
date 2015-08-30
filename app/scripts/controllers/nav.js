'use strict';

/**
 * @ngdoc function
 * @name phundusApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('NavCtrl', ['$rootScope', '$scope', '$location', 'Auth',
    function ($rootScope, $scope, $location, Auth) {
      $scope.user = Auth.user;
      $scope.userRoles = Auth.userRoles;
      $scope.accessLevels = Auth.accessLevels;

      $scope.logout = function () {
        Auth.logout(function () {
            $location.path('/goodbye/');
          },
          function (err) {
            $rootScope.error = err;
          },
          function (warn) {
            $location.path('/goodbye/?warn=' + encodeURI(warn));
          });
      };
    }]);
