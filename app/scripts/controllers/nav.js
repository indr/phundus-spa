'use strict';

/**
 * @ngdoc function
 * @name phundusApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('NavCtrl', ['$rootScope', '$scope', '$location', '$window', 'Auth',
    function ($rootScope, $scope, $location, $window, Auth) {
      $scope.user = Auth.user;
      $scope.userRoles = Auth.userRoles;
      $scope.accessLevels = Auth.accessLevels;

      $scope.queryString = '';
      $scope.search = function () {
        $window.location.href = '/shop/Search?queryString=' + $scope.queryString;
      };

      $scope.select = function (membership) {
        Auth.select(membership, undefined, function (err) {
          $rootScope.warn = err;
        });
      };

      $scope.logout = function () {
        Auth.logout(function () {
            $location.path('/goodbye');
          },
          function (err) {
            $rootScope.error = err;
          });
      };
    }]);
