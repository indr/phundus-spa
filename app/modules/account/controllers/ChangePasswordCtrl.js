'use strict';

(function () {
  angular.module('ph.account')
    .controller('AccountChangePasswordCtrl', ['$scope', '$uibModalInstance', '$timeout', 'AccountChangePassword',
      function ($scope, $uibModalInstance, $timeout, AccountChangePassword) {
        $scope.ok = function () {
          if (!$scope.formChangePassword.$valid) {
            return;
          }

          $scope.success = null;
          $scope.error = null;

          $scope.formChangePassword.$submitting = true;
          AccountChangePassword.post($scope.changePassword, function () {
            $scope.formChangePassword.$submitting = false;
            if ($scope.formChangePassword) {
              $scope.formChangePassword.$setPristine();
              $scope.formChangePassword.$setUntouched();
            }
            $scope.changePassword = {};
            $scope.success = 'Das Passwort wurde erfolgreich geändert.';
            $timeout(function () {
              $uibModalInstance.close();
            }, 2000);
          }, function () {
            $scope.formChangePassword.$submitting = false;
            $scope.error = 'Fehler beim Ändern des Passworts.';
          });
        };

        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };
      }
    ]);
})();
