(function () {
  'use strict';

  angular.module('ph.inventory')
    .directive('phInventoryArticleDetails', phInventoryArticleDetails);

  phInventoryArticleDetails.$inject = [];
  function phInventoryArticleDetails() {
    return {
      restrict: 'EA',
      replace: 'true',
      bindToController: {
        tenantId: '=',
        articleId: '=',
        hasMemberPrice: '='
      },
      controllerAs: 'vm',
      controller: Controller,
      templateUrl: 'modules/inventory/views/directives/phInventoryArticleDetails.html'
    };

    function Controller(Articles) {
      var vm = this;
      vm.article = null;

      activate();

      function activate() {
        Articles.get({tenantId: vm.tenantId, articleId: vm.articleId}).$promise
          .then(getArticleCompleted);

        function getArticleCompleted(res) {
          vm.article = res;
          return res;
        }
      }
    }
  }
})();
