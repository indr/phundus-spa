'use strict';

(function () {
  angular.module('ph.inventory')
    .directive('phInventoryProductDetails', inventoryProductDetails);

  inventoryProductDetails.$inject = [];
  function inventoryProductDetails() {
    return {
      restrict: 'EA',
      replace: 'true',
      bindToController: {
        tenantId: '=',
        productId: '=',
        hasMemberPrice: '='
      },
      controllerAs: 'vm',
      controller: function () {
        var vm = this;
      },
      templateUrl: 'modules/inventory/views/directives/inventory-product-details.html'
    }
  }
})();
