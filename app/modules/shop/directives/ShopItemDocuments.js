'use strict';

(function () {
  angular.module('phundusApp')
    .directive('phShopItemDocuments', [
      function () {
        return {
          restrict: 'E',
          replace: true,
          scope: {
            documents: '='
          },
          templateUrl: 'modules/shop/views/directives/ph-shop-item-documents.html'
        }
      }]);
})();
