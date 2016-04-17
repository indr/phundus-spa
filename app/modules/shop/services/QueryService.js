(function () {
  'use strict';

  angular.module('ph.shop')
    .factory('ShopQueryService', ShopQueryService);


  ShopQueryService.$inject = ['ShopItems'];

  function ShopQueryService(ShopItems) {
    var filter = {
      lessorId: null,
      string: null
    };

    return {
      filter: filter,
      query: query
    };

    function query(page, limit) {
      return ShopItems.get({
        q: filter.text,
        lessorId: filter.lessorId,
        offset: limit * (page - 1),
        limit: limit
      }).$promise;
    }
  }
})();
