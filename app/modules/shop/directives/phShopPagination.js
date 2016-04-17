(function () {
  'use strict';

  angular.module('ph.shop')
    .directive('phShopPagination', phShopPagination);


  function phShopPagination() {
    return {
      restrict: 'E',
      scope: true,
      templateUrl: 'modules/shop/views/directives/phShopPagination.html',
      controller: ['$scope', 'shopQueryService', controller]
    };

    function controller($scope, queryService) {
      $scope.page = queryService.page;
    }
  }
})();
