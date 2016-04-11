'use strict';

(function () {
  angular.module('ph.admin')
    .controller('AdminEventProcessorsCtrl', ['$scope', 'EventProcessors', '$window',
      function ($scope, Processors, $window) {
        Processors.query(function (res) {
          $scope.maxEventId = res.maxEventId;
          $scope.rowCollection = res.results;
          $scope.displayedCollection = [].concat($scope.rowCollection);
        });

        $scope.process = function (row) {
          Processors.patch({processorId: row.processorId});
        };

        $scope.processAll = function () {
          Processors.patch();
        };

        $scope.reset = function (row) {
          Processors.put({processorId: row.processorId});
        };

        $scope.recreate = function (row) {
          Processors.delete({processorId: row.processorId});
        };

        $scope.showStatus = function (row) {
          if (row.errorMessage === null) {
            return;
          }
          $window.alert(row.errorMessage);
        };
      }
    ]);
})();
