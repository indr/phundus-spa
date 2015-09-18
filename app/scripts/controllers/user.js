'use strict';

/**
 * @ngdoc function
 * @name phundusApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('UserCtrl',
  ['$rootScope', '$scope', 'Auth', function ($rootScope, $scope, Auth) {

    $scope.user = Auth.user;
  }]);
