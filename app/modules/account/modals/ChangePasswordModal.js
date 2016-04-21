(function () {
  'use strict';

  angular.module('ph.account')
    .factory('AccountChangePasswordModal', ChangePasswordModal);


  function ChangePasswordModal($uibModal) {
    return {
      open: openModal
    };

    function openModal() {
      $uibModal.open({
        templateUrl: 'modules/account/views/modals/change-password.html',
        controller: ChangePasswordModalInstCtrl
      });
    }
  }

  /*@ngInject*/
  function ChangePasswordModalInstCtrl($scope, $uibModalInstance, $timeout, AccountChangePassword) {
    $scope.ok = ok;
    $scope.cancel = cancel;

    function ok() {
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
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }
  }
})();
