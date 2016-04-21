(function () {
  'use strict';

  angular.module('ph.inventory')
    .directive('phInventoryArticleStock', phInventoryArticleStock);


  function phInventoryArticleStock() {
    return {
      restrict: 'EA',
      replace: 'true',
      bindToController: {
        tenantId: '=',
        articleId: '='
      },
      controllerAs: 'vm',
      controller: InventoryArticleStockCtrl,
      templateUrl: 'modules/inventory/views/directives/phInventoryArticleStock.html'
    }
  }

  /*@ngInject*/
  function InventoryArticleStockCtrl(ArticlesStock) {
    var vm = this;

    ArticlesStock.get({ownerId: vm.tenantId, articleId: vm.articleId},
      function (res) {
        vm.availabilities = res.availabilities;
        vm.reservations = res.reservations;
      });
  }
})();
