(function () {
  'use strict';

  angular.module('ph.shop')
    .directive('phShopPagination', phShopPagination);

  function phShopPagination() {
    return {
      restrict: 'E',
      scope: false,
      templateUrl: 'modules/shop/views/directives/phShopPagination.html'
    }
  }
})();
