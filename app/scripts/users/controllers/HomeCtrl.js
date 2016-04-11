'use strict';

(function () {
  angular.module('phundusApp')
    .controller('UsersHomeCtrl', ['$scope', 'userId', 'Stores', 'Alert',
      function ($scope, userId, Stores, Alert) {
        $scope.openStore = function () {
          $scope.isOpeningStore = true;
          Stores.post({userId: $scope.user.userId}, function (res) {
            $scope.isOpeningStore = false;
            $scope.user.store = res;
            Alert.success('Deine Materialstelle wurde erfolgreich eröffnet.');
          }, function () {
            $scope.isOpeningStore = false;
            Alert.error('Fehler beim Eröffnen deiner Materialstelle.');
          });
        }
      }
    ]);
})();
