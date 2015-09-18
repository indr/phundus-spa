'use strict';

/**
 * @ngdoc function
 * @name phundusApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('UserCtrl', ['$rootScope', '$scope', '$stateParams', 'Users',
    function ($rootScope, $scope, $stateParams, Users) {
      $scope.loaded = false;

      Users.get($stateParams.userId, function (res) {
        $scope.user = res;
        $scope.loaded = true;
      }, function () {
        $rootScope.error = "Failed to fetch users.";
      });
    }
  ]);
