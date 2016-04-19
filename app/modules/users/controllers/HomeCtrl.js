(function () {
  'use strict';

  angular.module('ph.users')
    .controller('UserHomeCtrl', UsersHomeCtrl);

  UsersHomeCtrl.$inject = ['$scope', 'Stores', 'Alert'];
  function UsersHomeCtrl($scope, Stores, Alert) {
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
})();
