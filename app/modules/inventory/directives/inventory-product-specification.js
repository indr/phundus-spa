'use strict';

(function () {
  angular.module('ph.inventory')
    .directive('phInventoryProductSpecification', inventoryProductSpecification);

  inventoryProductSpecification.$inject = [];
  function inventoryProductSpecification() {
    return {
      restrict: 'EA',
      replace: 'true',
      bindToController: {
        tenantId: '=',
        productId: '='
      },
      controllerAs: 'vm',
      controller: inventoryProductSpecificationCtrl,
      templateUrl: 'modules/inventory/views/directives/inventory-product-specification.html'
    }
  }

  inventoryProductSpecificationCtrl.$inject = ['Articles', 'Alert'];
  function inventoryProductSpecificationCtrl(Articles, Alert) {
    var vm = this;

    vm.data = {};

    Articles.get({ownerId: vm.tenantId, articleId: vm.productId}, function (res) {
      vm.data.specification = res.specification;
    }, function () {
      Alert.error('Fehler beim Laden der Spezifikation.');
    });

    vm.submit = function () {
      vm.form.$submitting = true;
      Articles.patch({
        ownerId: vm.tenantId,
        articleId: vm.productId,
        specification: vm.data.specification
      }, function () {
        vm.form.$submitting = false;
        Alert.success('Die Spezifikation wurde erfolgreich gespeichert.');
      }, function () {
        vm.form.$submitting = false;
        Alert.error('Fehler beim Speichern der Spezifikation.');
      });
    };
  }
})();
