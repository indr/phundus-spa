'use strict';

(function () {
  angular.module('ph.inventory')
    .directive('phInventoryProductFields', inventoryProductFields);

  inventoryProductFields.$inject = [];
  function inventoryProductFields() {
    return {
      restrict: 'EA',
      replace: 'true',
      bindToController: {
        tenantId: '=',
        productId: '='
      },
      controllerAs: 'ipf',
      controller: inventoryProductFieldsCtrl,
      templateUrl: 'modules/inventory/views/directives/inventory-product-fields.html'
    }
  }

  inventoryProductFieldsCtrl.$inject = ['Articles', 'Alert'];
  function inventoryProductFieldsCtrl(Articles, Alert) {
    var vm = this;

    Articles.get({ownerId: vm.tenantId, articleId: vm.productId},
      function (res) {
        vm.article = res;
      },
      function () {
        Alert.error('Fehler beim Laden des Artikels.');
      });

    vm.submit = function () {
      vm.form.$submitting = true;
      Articles.patch({
          ownerId: vm.tenantId, articleId: vm.productId, name: vm.article.name, brand: vm.article.brand,
          grossStock: vm.article.grossStock, color: vm.article.color
        },
        function () {
          vm.form.$submitting = false;
          Alert.success('Das Material wurde erfolgreich gespeichert.');
        },
        function () {
          vm.form.$submitting = false;
          Alert.error('Fehler beim Speichern des Material.');
        });
    };
  }
})();
