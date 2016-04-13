'use strict';

(function () {
  angular.module('ph.orders')
    .controller('UserOrdersCtrl', ['$scope', 'userId', 'Orders', 'Alert',
      function ($scope, userId, Orders, Alert) {
        Orders.query({userId: userId}, function (res) {
          $scope.rowCollection = res.results;
          $scope.displayedCollection = [].concat($scope.rowCollection);
        }, function () {
          Alert.error('Fehler beim Laden der Bestellungen.');
        });
      }
    ]);
})();
