(function () {
  'use strict';

  angular.module('ph.shop')
    .factory('ShopQueryService', ShopQueryService);

  function ShopQueryService() {
    return {
      filter: {
        lessorId: null,
        string: null
      }
    };
  }
})();
