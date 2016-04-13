'use strict';

(function () {
  angular.module('ph.inventory')
    .directive('phInventoryProductDescription', inventoryProductDescription);

  inventoryProductDescription.$inject = [];
  function inventoryProductDescription() {
    return {
      restrict: 'EA',
      replace: 'true',
      bindToController: {
        tenantId: '=',
        productId: '='
      },
      controllerAs: 'vm',
      controller: inventoryProductDescriptionCtrl,
      templateUrl: 'modules/inventory/views/directives/inventory-product-description.html'
    }
  }

  inventoryProductDescriptionCtrl.$inject = ['Articles', 'Alert'];
  function inventoryProductDescriptionCtrl(Articles, Alert) {
    var vm = this;

    vm.data = {};

    Articles.get({ownerId: vm.tenantId, articleId: vm.productId},
      function (res) {
        vm.data.description = res.description;
      }, function () {
        Alert.error('Fehler beim Laden der Beschreibung.');
      });

    vm.submit = function () {
      vm.form.$submitting = true;
      Articles.patch({
        ownerId: vm.tenantId,
        articleId: vm.productId,
        description: vm.data.description
      }, function () {
        vm.form.$submitting = false;
        Alert.success('Die Beschreibung wurde erfolgreich gespeichert.');
      }, function () {
        vm.form.$submitting = false;
        Alert.error('Fehler beim Speichern der Beschreibung.');
      });
    };
  }
})();
