(function () {
  'use strict';

  angular.module('ph.inventory')
    .directive('phInventoryProductFiles', inventoryProductFiles);

  inventoryProductFiles.$inject = [];
  function inventoryProductFiles() {
    return {
      restrict: 'EA',
      replace: 'true',
      scope: {
        tenantId: '=',
        productId: '='
      },
      controller: InventoryProductFilesCtrl,
      templateUrl: 'modules/inventory/views/directives/inventory-product-files.html'
    }
  }

  InventoryProductFilesCtrl.$inject = ['$scope'];
  function InventoryProductFilesCtrl($scope) {
    $scope.url = '/api/v0/articles/' + $scope.productId + '/files';
    $scope.hasPreview = true;
  }
})();
