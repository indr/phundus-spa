'use strict';

(function () {
  angular.module('ph.inventory')
    .directive('phInventoryProductPrices', inventoryProductPrices);

  inventoryProductPrices.$inject = [];
  function inventoryProductPrices() {
    return {
      restrict: 'EA',
      replace: 'true',
      bindToController: {
        tenantId: '=',
        productId: '=',
        hasMemberPrice: '='
      },
      controllerAs: 'ipp',
      controller: inventoryProductPricesCtrl,
      templateUrl: 'modules/inventory/views/directives/inventory-product-prices.html'
    }
  }

  inventoryProductPricesCtrl.$inject = ['Articles', 'Alert'];
  function inventoryProductPricesCtrl(Articles, Alert) {
    var vm = this;

    Articles.get({ownerId: vm.tenantId, articleId: vm.productId},
      function (res) {
        vm.pricesFormReset = _.pick(res, ['publicPrice', 'memberPrice']);
        vm.pricesFormModel = angular.copy(vm.pricesFormReset);
      },
      function () {
        Alert.error('Fehler beim Laden des Artikels.');
      });

    vm.submitPrices = function (form, model) {
      form.$submitting = true;
      Articles.patch({articleId: vm.productId, prices: model}, function () {
        vm.pricesFormReset = angular.copy(vm.pricesFormModel);
        form.$setPristine();
        form.$submitting = false;
        Alert.success('Die Einstellungen wurden erfolgreich gespeichert.');
      }, function (res) {
        form.$submitting = false;
        Alert.error('Fehler beim Speichern der Einstellungen: ' + (angular.isDefined(res.message) ? res.message : 'Unbekannter Fehler.'));
      });
    };
    vm.resetPrices = function (form, formModel, resetModel) {
      angular.copy(resetModel, formModel);
      form.$setPristine();
    };
  }
})();
