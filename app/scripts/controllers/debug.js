'use strict';

/**
 * @ngdoc function
 * @name phundusApp.controller:DebugCtrl
 * @description
 * # DebugCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('DebugCtrl', ['$scope', '$http', '$cookies', function ($scope, $http, $cookies) {
    $scope.status = '';

    $http.get('/api/v1/status').success(function (data) {
      $scope.status = data;
    });

    $scope.cookies = $cookies.getAll();

  }]);
