'use strict';

(function () {
  angular.module('ph.inventory')
    .directive('phInventoryProductStock', inventoryProductStock);

  inventoryProductStock.$inject = [];
  function inventoryProductStock() {
    return {
      restrict: 'EA',
      replace: 'true',
      bindToController: {
        tenantId: '=',
        productId: '='
      },
      controllerAs: 'vm',
      controller: inventoryProductStockCtrl,
      templateUrl: 'modules/inventory/views/directives/inventory-product-stock.html'
    }
  }

  inventoryProductStockCtrl.$inject = ['ArticlesStock'];
  function inventoryProductStockCtrl(ArticlesStock) {
    var vm = this;

    ArticlesStock.get({ownerId: vm.tenantId, articleId: vm.productId},
      function (res) {
        vm.availabilities = res.availabilities;
        vm.reservations = res.reservations;
      });
  }
})();
