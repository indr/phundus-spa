'use strict';

angular.module('phundusApp')
  .controller('AdminSchemaUpdateCtrl', ['$scope', 'SchemaUpdate', 'Alert',
    function ($scope, SchemaUpdate, Alert) {
      $scope.loading = true;

      SchemaUpdate.query(function (content) {
        $scope.loading = false;
        $scope.schemaUpdate = content.script;
      }, function () {
        $scope.loading = false;
        Alert.error('Fehler beim Laden des Schema-Updates.');
      });
    }
  ]);
