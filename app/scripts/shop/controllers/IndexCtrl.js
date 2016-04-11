'use strict';

(function () {
  angular.module('phundusApp')
    .controller('ShopIndexCtrl', IndexCtrl);

  IndexCtrl.$inject = ['$scope', 'ShopItems', 'Alert', '$uibModal'];

  function IndexCtrl($scope, ShopItems, Alert, $uibModal) {

    $scope.currentPage = 1;
    $scope.limit = 8;

    var filter = {
      searchQuery: null,
      lessorId: null
    };

    var getItems = function () {
      ShopItems.get({
        q: filter.searchQuery,
        lessorId: filter.lessorId,
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

    $scope.searchQuery = function (searchQuery, lessorId) {
      filter.searchQuery = searchQuery;
      filter.lessorId = lessorId;
      $scope.currentPage = 1;
      getItems();
    };

    $scope.$watch('currentPage', function () {
      getItems();
    });

    $scope.showItem = function (item) {
      $uibModal.open({
        templateUrl: 'views/shop/shop-item-modal.html',
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
