(function () {
  'use strict';

  angular.module('ph.inventory')
    .factory('inventoryCreateArticleModal', inventoryCreateArticleModal);

  inventoryCreateArticleModal.$inject = ['$uibModal', 'Articles', 'Alert'];

  function inventoryCreateArticleModal($uibModal, Articles, Alert) {
    return {
      open: openModal
    };

    function openModal(tenantId, success) {
      var modalInstance = $uibModal.open({
        templateUrl: 'modules/inventory/views/modals/create-product.html',
        controller: CreateArticleModalInstCtrl,
        resolve: {
          tenantId: function () {
            return tenantId;
          }
        }
      });

      modalInstance.result.then(function (article) {
        Articles.post(article, success, function () {
          Alert.error('Fehler beim Erstellen des Materials.');
        });
      });
    }
  }


  CreateArticleModalInstCtrl.$inject = ['$scope', '$uibModalInstance', 'tenantId'];

  function CreateArticleModalInstCtrl($scope, $uibModalInstance, tenantId) {

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
