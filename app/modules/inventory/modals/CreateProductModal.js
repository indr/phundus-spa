'use strict';

(function () {
  angular.module('ph.inventory')
    .factory('createProductModalDialog', CreateProductModalDialog);

  CreateProductModalDialog.$inject = ['$uibModal', 'Articles', 'Alert'];
  function CreateProductModalDialog($uibModal, Products, Alert) {
    return open;
    
    function open(tenantId, success) {
      var modalInstance = $uibModal.open({
        templateUrl: 'modules/inventory/views/modals/create-product.html',
        controller: CreateProductModalInstCtrl,
        resolve: {
          tenantId: function () {
            return tenantId;
          }
        }
      });

      modalInstance.result.then(function (product) {
        Products.post(product, success, function () {
          Alert.error('Fehler beim Erstellen des Materials.');
        });
      });
    }
  }

  CreateProductModalInstCtrl.$inject = ['$scope', '$uibModalInstance', 'tenantId'];
  function CreateProductModalInstCtrl($scope, $uibModalInstance, tenantId) {

    $scope.name = '';
    $scope.quantity = 1;

    $scope.ok = function () {
      if (!$scope.form.$valid) {
        return;
      }
      $uibModalInstance.close({ownerId: tenantId, name: $scope.name, quantity: $scope.quantity});
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
})();
