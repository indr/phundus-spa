'use strict';

(function () {
  angular.module('phundusApp')
    .directive('phShopSearch', ['Lessors', 'Alert',
      function (Lessors, Alert) {
        return {
          restrict: 'E',
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
    ]);
})();
