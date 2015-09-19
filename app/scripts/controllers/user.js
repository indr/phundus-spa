'use strict';

/**
 * @ngdoc function
 * @name phundusApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('UserCtrl', ['$rootScope', '$scope', '$stateParams', 'Users', 'Auth',
    function ($rootScope, $scope, $stateParams, Users, Auth) {
      $scope.loaded = false;
      $scope.isHome = false;

      Users.get($stateParams.userId, function (res) {
        $scope.user = res;
        $scope.isHome = $scope.user.userId === Auth.user.userId;
        $scope.loaded = true;
      }, function () {
        $rootScope.error = "Failed to fetch users.";
      });
    }
  ]);
