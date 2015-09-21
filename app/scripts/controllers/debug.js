'use strict';

/**
 * @ngdoc function
 * @name phundusApp.controller:DebugCtrl
 * @description
 * # DebugCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('DebugCtrl', ['$scope', '$http', '$cookies', 'Alerts', function ($scope, $http, $cookies, Alerts) {
    $scope.status = {};

    $http.get('/api/v1/status').success(function (data) {
      $scope.status = data;
    });

    $scope.cookies = $cookies.getAll();

    $scope.alertMsg = 'Alert message';

    $scope.addDanger = function() {
      Alerts.showDanger($scope.alertMsg);
    };

    $scope.addWarning = function() {
      Alerts.showWarning($scope.alertMsg);
    };

    $scope.addSuccess = function() {
      Alerts.showSuccess($scope.alertMsg);
    };

  }]);
