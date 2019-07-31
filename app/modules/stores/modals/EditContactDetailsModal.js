(function () {
  'use strict';

  angular.module('ph.stores')
    .factory('StoresEditContactDetailsModal', EditContactDetailsModal);


  function EditContactDetailsModal($uibModal) {
    return {
      open: openModal
    };

    function openModal(resolve) {
      var modalInstance = $uibModal.open({
        templateUrl: 'modules/stores/views/modals/edit-contact-details.html',
        controller: EditContactDetailsModalInstCtrl,
        resolve: resolve
      });

      return modalInstance.result;
    }
  }

  /*@ngInject*/
  function EditContactDetailsModalInstCtrl($scope, $timeout, $uibModalInstance, storeId, contact, Stores, PostalAddress) {
    $scope.contact = contact;

    $scope.ok = function () {
      if (!$scope.formChangeContact.$valid) {
        return;
      }

      $scope.success = null;
      $scope.error = null;

      Stores.patch({storeId: storeId}, {contact: $scope.contact}, function () {

        $scope.contact.postalAddress = PostalAddress.fromLines($scope.contact);

        $scope.success = 'Die Kontaktangaben wurden erfolgreich geändert.';
        $timeout(function () {
          $uibModalInstance.close($scope.contact);
        }, 2000);
      }, function () {
        $scope.error = 'Fehler beim Speichern der Kontaktangaben.';
      });
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
})();
