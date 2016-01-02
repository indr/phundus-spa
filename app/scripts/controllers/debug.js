'use strict';

/**
 * @ngdoc function
 * @name phundusApp.controller:DebugCtrl
 * @description
 * # DebugCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('DebugCtrl', ['$', '$scope', '$http', '$cookies', '$timeout', '$location', 'Alert',
    function ($, $scope, $http, $cookies, $timeout, $location, Alert) {
      $scope.status = {};
      $scope.host = $location.host();

      $http.get('/api/v0/status').success(function (data) {
        $scope.status = data;
      });
  
      $scope.toggleCartPopover = function() {
        $('#popover-glyphicon-cart').popover('show');
  
        $timeout(function() {
          $('#popover-glyphicon-cart').popover('hide')
        }, 4000, true);
      };
  
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
  
    }
  ]);
