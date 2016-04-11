'use strict';

(function () {
  angular.module('ph.account')
    .controller('ResetPasswordCtrl', ['$scope', 'Alert', 'AccountResetPassword',
      function ($scope, Alert, AccountResetPassword) {
        $scope.submitted = false;

        $scope.submit = function () {
          $scope.form.$submitting = true;
          AccountResetPassword.post($scope.resetPassword, function () {
            $scope.form.$submitting = false;
            $scope.submitted = true;
          }, function () {
            $scope.form.$submitting = false;
            Alert.error('Fehler beim Zurücksetzen des Passworts.')
          });
        }
      }
    ]);
})();
