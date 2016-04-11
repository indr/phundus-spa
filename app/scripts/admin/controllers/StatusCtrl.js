'use strict';

angular.module('phundusApp')
  .controller('AdminStatusCtrl', ['$scope', '$resource', 'Alert',
    function ($scope, $resource, Alert) {
      $resource('/api/v0/status').get({}, function (res) {
        $scope.data = res;
      }, function () {
        Alert.error('Fehler beim Laden der Statusinformationen.');
      })
    }
  ]);
