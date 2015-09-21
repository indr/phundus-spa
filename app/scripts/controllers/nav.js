'use strict';

/**
 * @ngdoc function
 * @name phundusApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('NavCtrl', ['$rootScope', '$scope', '$location', '$window', '$timeout', 'Auth', 'Alerts',
    function ($rootScope, $scope, $location, $window, $timeout, Auth, Alerts) {

      $rootScope.alerts = Alerts.alerts;

      $rootScope.dismissAlert = function(type, id) {
        Alerts.dismiss(type, id);
      };

      $scope.user = Auth.user;
      $scope.userRoles = Auth.userRoles;
      $scope.accessLevels = Auth.accessLevels;

      $scope.queryString = '';
      $scope.search = function () {
        $window.location.href = '/shop/Search?queryString=' + $scope.queryString;
      };

      $scope.logout = function () {
        Auth.logout(function () {
            $location.path('/goodbye');
          },
          function (err) {
            Alerts.showError(err);
          });
      };
    }]);
