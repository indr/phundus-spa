'use strict';

(function () {
  angular.module('ph.account')
    .factory('AccountChangeEmailAddressModal', ChangeEmailAddressModal);

  ChangeEmailAddressModal.$inject = ['$uibModal'];

  function ChangeEmailAddressModal($uibModal) {
    return {
      open: open
    };

    function open() {
      $uibModal.open({
        templateUrl: 'modules/account/views/modals/change-email-address.html',
        controller: ChangeEmailAddressModalInstCtrl
      });
    }
  }


  ChangeEmailAddressModalInstCtrl.$inject = ['$scope', '$uibModalInstance', '$timeout', 'AccountChangeEmailAddress'];

  function ChangeEmailAddressModalInstCtrl($scope, $uibModalInstance, $timeout, AccountChangeEmailAddress) {
    $scope.ok = function () {
      if (!$scope.formChangeEmailAddress.$valid) {
        return;
      }

      $scope.success = null;
      $scope.error = null;

      $scope.formChangeEmailAddress.$submitting = true;
      AccountChangeEmailAddress.post($scope.changeEmailAddress, function () {
        $scope.formChangeEmailAddress.$submitting = false;
        if ($scope.formChangeEmailAddress) {
          $scope.formChangeEmailAddress.$setPristine();
          $scope.formChangeEmailAddress.$setUntouched();
        }
        $scope.changeEmailAddress = {};
        $scope.success = 'Das Bestätigungs-E-Mail wurde versendet.';
        $timeout(function () {
          $uibModalInstance.close();
        }, 2000);
      }, function () {
        $scope.formChangeEmailAddress.$submitting = false;
        $scope.error = 'Fehler beim Ändern der E-Mail-Addresse.';
      });

    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
})();
