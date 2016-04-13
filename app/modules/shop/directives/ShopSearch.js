'use strict';

(function () {
  angular.module('ph.shop')
    .directive('phShopSearch', shopSearch);

  shopSearch.$inject = ['Lessors', 'Alert'];
  function shopSearch(Lessors, Alert) {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        submit: '='
      },
      templateUrl: 'modules/shop/views/directives/ph-shop-search.html',
      link: function (scope) {
        Lessors.get(function (res) {
          scope.lessors = res.results;
        }, function (res) {
          Alert.error('Fehler beim Laden der Vermieter: ' + res.data.message);
        });
      }
    }
  }
})();
