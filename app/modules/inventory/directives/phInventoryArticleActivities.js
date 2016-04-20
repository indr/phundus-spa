(function () {
  'use strict';

  angular.module('ph.inventory')
    .directive('phInventoryArticleActivities', phInventoryArticleActivities);

  phInventoryArticleActivities.$inject = [];
  function phInventoryArticleActivities() {
    return {
      restrict: 'EA',
      replace: 'true',
      bindToController: {
        tenantId: '=',
        articleId: '='
      },
      controllerAs: 'ipa',
      controller: InventoryArticleActivitiesCtrl,
      templateUrl: 'modules/inventory/views/directives/phInventoryArticleActivities.html'
    }
  }

  InventoryArticleActivitiesCtrl.$inject = ['ArticlesActions', 'Alert'];
  function InventoryArticleActivitiesCtrl(ArticlesActions, Alert) {
    var vm = this;

    ArticlesActions.get({articleId: vm.articleId}, function (res) {
      vm.actions = res.results;
    }, function (res) {
      Alert.error('Fehler beim Laden der Artikel-Aktivitäten: ' + res.data.message);
    });
  }
})();
