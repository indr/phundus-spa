(function () {
  'use strict';

  angular.module('ph.shop')
    .directive('phShopItemDocuments', phShopItemDocuments);


  function phShopItemDocuments() {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        documents: '='
      },
      templateUrl: 'modules/shop/views/directives/phShopItemDocuments.html'
    }
  }
})();
