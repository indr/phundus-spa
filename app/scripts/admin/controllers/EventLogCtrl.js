'use strict';

angular.module('phundusApp')

  .controller('AdminEventLogCtrl', ['$scope', 'EventLog',
    function ($scope, EventLog) {
      EventLog.query(function (res) {
        $scope.rowCollection = res.results;
        $scope.displayedCollection = [].concat($scope.rowCollection);
      });
    }
  ]);
