'use strict';

/**
 * @ngdoc function
 * @name phundusApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('AdminCtrl',
  ['$rootScope', '$scope', 'Users', 'Auth', function($rootScope, $scope, Users, Auth) {
    $scope.loading = true;
    $scope.userRoles = Auth.userRoles;

    Users.getAll(function(res) {
      $scope.users = res;
      $scope.loading = false;
    }, function() {
      $rootScope.error = "Failed to fetch users.";
      $scope.loading = false;
    });

  }]);
