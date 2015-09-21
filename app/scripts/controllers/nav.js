'use strict';

/**
 * @ngdoc function
 * @name phundusApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('NavCtrl', ['$rootScope', '$scope', '$location', '$window', '$timeout', 'Auth', 'uuid4',
    function ($rootScope, $scope, $location, $window, $timeout, Auth, uuid4) {

      $rootScope.alerts = {};

      $rootScope.showAlert = function(type, msg) {
        var id = uuid4.generate();
        $rootScope.alerts[type] = $rootScope.alerts[type] || {};
        $rootScope.alerts[type][id] = msg;
        $timeout(function(type, id) {
          delete $rootScope.alerts[type][id];
        }, 4000, true, type, id);
      };

      $rootScope.dismissAlert = function(type, id) {
        delete $rootScope.alerts[type][id];
      };

      $rootScope.showDanger = function(msg) {
        $rootScope.showAlert('danger', msg);
      };
      $rootScope.showError = $rootScope.showDanger;

      $rootScope.showWarning = function(msg) {
        $rootScope.showAlert('warning', msg);
      };

      $rootScope.showSuccess = function(msg) {
        $rootScope.showAlert('success', msg);
      };

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
