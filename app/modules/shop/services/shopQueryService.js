(function () {
  'use strict';

  angular.module('ph.shop')
    .factory('shopQueryService', shopQueryService);


  shopQueryService.$inject = ['ShopItems'];

  function shopQueryService(shopItemsApi) {
    var _filter = {
      lessorId: null,
      string: null
    };

    var _page = {
      current: 1,
      start: 0,
      size: 8,
      total: null
    };

    return {
      filter: _filter,
      page: _page,
      query: query
    };

    function query(page, limit, filter) {
      if (filter) {
        _filter.lessorId = filter.lessorId || _filter.lessorId;
        _filter.text = filter.text || _filter.text;
      }
      return shopItemsApi.query({
        q: _filter.text,
        lessorId: _filter.lessorId,
        offset: limit * (page - 1),
        limit: limit
      }).$promise
        .then(setPage);
    }

    function setPage(res) {
      _page.current = Math.ceil((res.offset + 1) / res.limit);
      _page.start = res.offset;
      _page.size = res.limit;
      _page.total = res.total;
      return res;
    }
  }
})();
