'use strict';

/**
 * @ngdoc function
 * @name phundusApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('AdminCtrl', ['$scope', 'Users', 'Auth', 'Alerts',
    function ($scope, Users, Auth, Alerts) {
      $scope.loading = true;
      $scope.userRoles = Auth.userRoles;

      Users.getAll(function (res) {
        $scope.users = res;
        $scope.loading = false;
      }, function () {
        Alerts.showError("Failed to fetch users.");
        $scope.loading = false;
      });
    }
  ]);
