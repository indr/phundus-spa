'use strict';

(function () {
  angular.module('ph.stores')
    .factory('StoresEditContactDetailsModal', EditContactDetailsModal);

  EditContactDetailsModal.$inject = ['$uibModal'];

  function EditContactDetailsModal($uibModal) {
    return function (storeId, contact, success) {
      var modalInstance = $uibModal.open({
        templateUrl: 'modules/ui/views/modal-change-contact.html',
        controller: EditContactDetailsModalInstCtrl,
        resolve: {
          storeId: function () {
            return storeId
          },
          contact: function () {
            return contact;
          }
        }
      });

      if (angular.isDefined(success))
        modalInstance.result.then(success);
      return modalInstance.result;
    }
  }


  EditContactDetailsModalInstCtrl.$inject = ['$scope', '$timeout', '$uibModalInstance', 'storeId', 'contact', 'Stores', 'PostalAddress'];

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
