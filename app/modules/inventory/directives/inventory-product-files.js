'use strict';

(function () {
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
      controller: inventoryProductFilesCtrl,
      templateUrl: 'modules/inventory/views/directives/inventory-product-files.html'
    }
  }

  inventoryProductFilesCtrl.$inject = ['$scope'];
  function inventoryProductFilesCtrl($scope) {
    $scope.url = '/api/v0/articles/' + $scope.productId + '/files';
    $scope.hasPreview = true;
  }
})();
