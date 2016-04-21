(function () {
  'use strict';

  angular.module('ph.inventory')
    .directive('phInventoryArticleSpecification', phInventoryArticleSpecification);


  function phInventoryArticleSpecification() {
    return {
      restrict: 'EA',
      replace: 'true',
      bindToController: {
        tenantId: '=',
        articleId: '='
      },
      controllerAs: 'vm',
      controller: InventoryArticleSpecificationCtrl,
      templateUrl: 'modules/inventory/views/directives/phInventoryArticleSpecification.html'
    }
  }

  /*@ngInject*/
  function InventoryArticleSpecificationCtrl(Articles, Alert) {
    var vm = this;

    vm.data = {};

    Articles.get({ownerId: vm.tenantId, articleId: vm.articleId}, function (res) {
      vm.data.specification = res.specification;
    }, function () {
      Alert.error('Fehler beim Laden der Spezifikation.');
    });

    vm.submit = function () {
      vm.form.$submitting = true;
      Articles.patch({
        ownerId: vm.tenantId,
        articleId: vm.articleId,
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
