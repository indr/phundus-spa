(function () {
  'use strict';

  angular.module('ph.shop')
    .directive('phShopSearch', phShopSearch);


  function phShopSearch() {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      templateUrl: 'modules/shop/views/directives/phShopSearch.html',
      controller: ['$scope', '$state', 'shopQueryService', 'shopLessorsResource', 'Alert', controller]
    };

    function controller($scope, $state, queryService, lessorsApi, alert) {

      $scope.filter = queryService.filter;
      $scope.search = search;

      activate();

      function activate() {
        lessorsApi.query().$promise
          .then(queryLessorsCompleted)
          .catch(queryLessorsFailed);
      }

      function search() {
        $state.go('public.index', {q: $scope.filter.text, l: $scope.filter.lessorId});
      }

      function queryLessorsCompleted(res) {
        $scope.lessors = res.results;
      }

      function queryLessorsFailed(res) {
        alert.error('Fehler beim Laden der Vermieter: ' + res.data.message);
      }
    }
  }
})
();
