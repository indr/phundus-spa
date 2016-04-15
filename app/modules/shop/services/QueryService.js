'use strict';

(function () {
  angular.module('ph.shop')
    .factory('ShopQueryService', ShopQueryService);

  function ShopQueryService() {
    return {
      queryString: null,
      querylessorId: null
    };
  }
})();
