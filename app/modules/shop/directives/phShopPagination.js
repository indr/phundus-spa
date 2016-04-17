(function () {
  'use strict';

  angular.module('ph.shop')
    .directive('phShopPagination', phShopPagination);

  /**
   * @ngdoc directive
   * @name ph.shop.directive:phShopPagination
   * @description Pagination control for shop items view.
   */
  function phShopPagination() {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'modules/shop/views/directives/phShopPagination.html',
      controller: ['$scope', 'shopQueryService', controller]
    };

    function controller($scope, queryService) {
      $scope.page = queryService.page;
    }
  }
})();
