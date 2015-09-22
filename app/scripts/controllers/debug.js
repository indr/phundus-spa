'use strict';

/**
 * @ngdoc function
 * @name phundusApp.controller:DebugCtrl
 * @description
 * # DebugCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('DebugCtrl', ['$scope', '$http', '$cookies', 'Alert', function ($scope, $http, $cookies, Alert) {
    $scope.status = {};

    $http.get('/api/v1/status').success(function (data) {
      $scope.status = data;
    });

    $scope.cookies = $cookies.getAll();

    $scope.alertMsg = 'Alert message';

    $scope.addError = function() {
      Alert.error($scope.alertMsg);
    };

    $scope.addDanger = function() {
      Alert.danger($scope.alertMsg);
    };

    $scope.addWarning = function() {
      Alert.warning($scope.alertMsg);
    };

    $scope.addSuccess = function() {
      Alert.success($scope.alertMsg);
    };

  }]);
