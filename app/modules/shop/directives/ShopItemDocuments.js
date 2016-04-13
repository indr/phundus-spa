'use strict';

(function () {
  angular.module('ph.shop')
    .directive('phShopItemDocuments', shopItemDocuments);

  function shopItemDocuments() {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        documents: '='
      },
      templateUrl: 'modules/shop/views/directives/ph-shop-item-documents.html'
    }
  }
})();
