'use strict';

/**
 * @ngdoc function
 * @name phundusApp.controller:DebugCtrl
 * @description
 * # DebugCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('DebugCtrl', ['$rootScope', '$scope', '$http', '$cookies', function ($rootScope, $scope, $http, $cookies) {
    $scope.status = {};

    $http.get('/api/v1/status').success(function (data) {
      $scope.status = data;
    });

    $scope.cookies = $cookies.getAll();

    $scope.alertMsg = 'Alert message';

    $scope.addDanger = function() {
      $rootScope.showDanger($scope.alertMsg);
    };

    $scope.addWarning = function() {
      $rootScope.showWarning($scope.alertMsg);
    };

    $scope.addSuccess = function() {
      $rootScope.showSuccess($scope.alertMsg);
    };

  }]);
