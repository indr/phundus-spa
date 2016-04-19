(function () {
  'use strict';

  angular.module('ph.admin')
    .controller('AdminEventLogCtrl', ['$scope', 'EventLog',
      function ($scope, EventLog) {
        EventLog.query(function (res) {
          $scope.rowCollection = res.results;
          $scope.displayedCollection = [].concat($scope.rowCollection);
        });
      }
    ]);
})();
