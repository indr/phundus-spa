'use strict';

(function () {
  angular.module('ph.account')
    .factory('AccountChangePasswordModal', ChangePasswordModal);

  ChangePasswordModal.$inject = [];

  function ChangePasswordModal() {
    return {
      open: open
    };

    function open() {
      $uibModal.open({
        templateUrl: 'modules/account/views/modals/change-password.html',
        controller: ChangePasswordModalInstCtrl
      });
    }
  }


  ChangePasswordModalInstCtrl.$inject = ['$scope', '$uibModalInstance', '$timeout', 'AccountChangePassword'];

  function ChangePasswordModalInstCtrl($scope, $uibModalInstance, $timeout, AccountChangePassword) {
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
})();
