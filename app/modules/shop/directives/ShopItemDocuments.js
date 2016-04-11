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
          templateUrl: 'views/directives/ph-shop-item-documents.html'
        }
      }]);
})();
