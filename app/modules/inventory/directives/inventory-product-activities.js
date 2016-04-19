(function () {
  'use strict';

  angular.module('ph.inventory')
    .directive('phInventoryProductActivities', inventoryProductActivities);

  inventoryProductActivities.$inject = [];
  function inventoryProductActivities() {
    return {
      restrict: 'EA',
      replace: 'true',
      bindToController: {
        tenantId: '=',
        productId: '='
      },
      controllerAs: 'ipa',
      controller: InventoryProductActivitiesCtrl,
      templateUrl: 'modules/inventory/views/directives/inventory-product-activities.html'
    }
  }

  InventoryProductActivitiesCtrl.$inject = ['ArticlesActions', 'Alert'];
  function InventoryProductActivitiesCtrl(ArticlesActions, Alert) {
    var vm = this;

    ArticlesActions.get({articleId: vm.productId}, function (res) {
      vm.actions = res.results;
    }, function (res) {
      Alert.error('Fehler beim Laden der Artikel-Aktivitäten: ' + res.data.message);
    });
  }
})();
