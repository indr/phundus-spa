(function () {
  'use strict';

  angular.module('ph.users')
    .controller('UserCtrl', UserCtrl);


  function UserCtrl($scope, userId, Users, Auth, Alert) {
    $scope.userId = userId;
    $scope.isHome = userId + '' === Auth.user.userId + '';
    $scope.user = null;

    Users.get({userId: userId}, function (res) {
      var user = res;

      if (user.store && user.store.contact) {
        user.store.contact.postcode = parseInt(user.store.contact.postcode);
      }

      $scope.user = res;

    }, function () {
      Alert.error('Fehler beim Laden des Benutzers.');
    });
  }
})();
