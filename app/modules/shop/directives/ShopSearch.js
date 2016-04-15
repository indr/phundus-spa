'use strict';

(function () {
  angular.module('ph.shop')
    .directive('phShopSearch', shopSearch);

  shopSearch.$inject = ['Lessors', 'Alert', 'ShopQueryService', '$state'];

  function shopSearch(Lessors, Alert, QueryService, $state) {
    return {
      restrict: 'EA',
      replace: true,
      scope: true,
      templateUrl: 'modules/shop/views/directives/ph-shop-search.html',
      link: function (scope) {

        scope.queryString = QueryService.queryString;
        scope.lessorId = QueryService.querylessorId;
        scope.query = query;

        function query() {
          $state.go('public.index', {q: scope.queryString, l: scope.lessorId});
        }

        Lessors.get(function (res) {
          scope.lessors = res.results;
        }, function (res) {
          Alert.error('Fehler beim Laden der Vermieter: ' + res.data.message);
        });
      }
    }
  }
})();
