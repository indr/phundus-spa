'use strict';

(function () {
  angular.module('ph.inventory')
    .directive('phInventoryProductStock', inventoryProductStock);

  function inventoryProductStock() {
    return {
      restrict: 'EA',
      replace: 'true',
      bindToController: {
        tenantId: '=',
        productId: '='
      },
      controllerAs: 'vm',
      controller: InventoryProductStockCtrl,
      templateUrl: 'modules/inventory/views/directives/inventory-product-stock.html'
    }
  }

  InventoryProductStockCtrl.$inject = ['ArticlesStock'];
  function InventoryProductStockCtrl(ArticlesStock) {
    var vm = this;

    ArticlesStock.get({ownerId: vm.tenantId, articleId: vm.productId},
      function (res) {
        vm.availabilities = res.availabilities;
        vm.reservations = res.reservations;
      });
  }
})();
