(function () {
  'use strict';

  angular.module('ph.shop')
    .directive('phShopSearch', phShopSearch);


  phShopSearch.$inject = ['Lessors', 'Alert', 'ShopQueryService', '$state'];

  function phShopSearch(Lessors, Alert, QueryService, $state) {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      templateUrl: 'modules/shop/views/directives/phShopSearch.html',
      link: function (scope) {

        scope.filter = QueryService.filter;
        scope.search = search;

        activate();

        function activate() {
          Lessors.get(function (res) {
            scope.lessors = res.results;
          }, function (res) {
            Alert.error('Fehler beim Laden der Vermieter: ' + res.data.message);
          });
        }

        function search() {
          $state.go('public.index', {q: scope.filter.text, l: scope.filter.lessorId});
        }
      }
    }
  }
})();
