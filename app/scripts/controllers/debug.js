'use strict';

/**
 * @ngdoc function
 * @name phundusApp.controller:DebugCtrl
 * @description
 * # DebugCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('DebugCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.status = '';

    $http.get('/api/v1/status').success(function(data) {
      var flatten = function(data, prefix) {
        prefix = prefix || '';
        var result = '';
        for (var key in data) {
          if (typeof(data[key]) === 'object') {
            result += flatten(data[key], prefix + key + '.');
          }
          else {
            result += '\n' + prefix + key + ': ' + data[key];
          }
        }
        return result;
      };
      $scope.status = flatten(data).replace(/^\s*/, '');
    });
  }]);
