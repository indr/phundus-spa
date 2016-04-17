(function () {
  'use strict';

  angular.module('ph.shop')
    .controller('ShopCtrl', ShopCtrl);


  ShopCtrl.$inject = ['$scope', 'Alert', '$uibModal', 'queryString', 'queryLessorId', 'ShopQueryService'];

  function ShopCtrl($scope, Alert, $uibModal, queryString, queryLessorId, QueryService) {
    $scope.currentPage = 1;
    $scope.limit = 8;

    QueryService.filter.lessorId = queryLessorId;
    QueryService.filter.text = queryString;

    var query = function () {
      QueryService.query($scope.currentPage, $scope.limit)
        .then(queryCompleted)
        .catch(queryFailed);
    };

    function queryCompleted(res) {
      $scope.offset = res.offset;
      $scope.limit = res.limit;
      $scope.totalItems = res.total;
      $scope.currentPage = Math.ceil(($scope.offset + 1) / $scope.limit);
      $scope.items = res.results;
    }

    function queryFailed(res) {
      Alert.error('Fehler beim Laden der Artikel: ' + res.data.message);
    }

    $scope.$watch('currentPage', function () {
      query();
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
