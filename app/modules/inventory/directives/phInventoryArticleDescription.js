(function () {
  'use strict';

  angular.module('ph.inventory')
    .directive('phInventoryArticleDescription', phInventoryArticleDescription);


  function phInventoryArticleDescription() {
    return {
      restrict: 'EA',
      replace: 'true',
      bindToController: {
        tenantId: '=',
        articleId: '='
      },
      controllerAs: 'vm',
      controller: InventoryArticleDescriptionCtrl,
      templateUrl: 'modules/inventory/views/directives/phInventoryArticleDescription.html'
    }
  }

  /*@ngInject*/
  function InventoryArticleDescriptionCtrl(Articles, Alert) {
    var vm = this;

    vm.data = {};

    Articles.get({ownerId: vm.tenantId, articleId: vm.articleId},
      function (res) {
        vm.data.description = res.description;
      }, function () {
        Alert.error('Fehler beim Laden der Beschreibung.');
      });

    vm.submit = function () {
      vm.form.$submitting = true;
      Articles.patch({
        ownerId: vm.tenantId,
        articleId: vm.articleId,
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
