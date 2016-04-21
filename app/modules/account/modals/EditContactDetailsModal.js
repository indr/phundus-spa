(function () {
  'use strict';

  angular.module('ph.account')
    .factory('AccountEditContactDetailsModal', EditContactDetailsModal);


  function EditContactDetailsModal($uibModal) {
    return {
      open: openModal
    };

    function openModal(resolve) {
      var modalInstance = $uibModal.open({
        templateUrl: 'modules/account/views/modals/change-contact.html',
        controller: ChangeContactDetailsModalInstCtrl,
        resolve: resolve
      });

      return modalInstance.result;
    }
  }

  /*@ngInject*/
  function ChangeContactDetailsModalInstCtrl($scope, $timeout, $uibModalInstance, userId, contact, UsersAddress) {
    $scope.contact = contact;
    $scope.ok = ok;
    $scope.cancel = cancel;

    function ok() {
      if (!$scope.formChangeContact.$valid) {
        return;
      }

      $scope.success = null;
      $scope.error = null;

      UsersAddress.put({userId: userId}, $scope.contact, function () {
        $scope.success = 'Die Kontaktangaben wurden erfolgreich geändert.';
        $timeout(function () {
          $uibModalInstance.close($scope.contact);
        }, 2000);
      }, function () {
        $scope.error = 'Fehler beim Speichern der Kontaktangaben.';
      });
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }
  }
})();
