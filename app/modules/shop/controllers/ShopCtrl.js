(function () {
  'use strict';

  angular.module('ph.shop')
    .controller('ShopCtrl', ShopCtrl);


  ShopCtrl.$inject = ['$scope', 'ShopItems', 'Alert', '$uibModal', 'queryString', 'queryLessorId', 'ShopQueryService'];

  function ShopCtrl($scope, ShopItems, Alert, $uibModal, queryString, queryLessorId, QueryService) {
    $scope.currentPage = 1;
    $scope.limit = 8;

    QueryService.filter.lessorId = queryLessorId;
    QueryService.filter.text = queryString;

    var getItems = function () {
      ShopItems.get({
        q: QueryService.filter.text,
        lessorId: QueryService.filter.lessorId,
        offset: $scope.limit * ($scope.currentPage - 1),
        limit: $scope.limit
      }, function (res) {
        $scope.offset = res.offset;
        $scope.limit = res.limit;
        $scope.totalItems = res.total;
        $scope.currentPage = Math.ceil(($scope.offset + 1) / $scope.limit);
        $scope.items = res.results;


      }, function (res) {
        Alert.error('Fehler beim Laden der Artikel: ' + res.data.message);
      });
    };

    $scope.$watch('currentPage', function () {
      getItems();
    });

    $scope.showItem = function (item) {
      $uibModal.open({
        templateUrl: 'modules/shop/views/shop-item-modal.html',
        controller: 'ShopItemCtrl',
        resolve: {
          itemId: function () {
            return item.itemId;
          }
        },
        size: 'lg'
      });
    };
  }
})();
