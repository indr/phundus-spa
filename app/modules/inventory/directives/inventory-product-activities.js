'use strict';

(function () {
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
      controller: inventoryProductActivitiesCtrl,
      templateUrl: 'modules/inventory/views/directives/inventory-product-activities.html'
    }
  }

  inventoryProductActivitiesCtrl.$inject = ['ArticlesActions', 'Alert'];
  function inventoryProductActivitiesCtrl(ArticlesActions, Alert) {
    var vm = this;

    ArticlesActions.get({articleId: vm.productId}, function (res) {
      vm.actions = res.results;
    }, function (res) {
      Alert.error('Fehler beim Laden der Artikel-Aktivitäten: ' + res.data.message);
    });
  }
})();
