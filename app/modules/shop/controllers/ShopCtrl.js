(function () {
  'use strict';

  angular.module('ph.shop')
    .controller('ShopCtrl', ShopCtrl);


  ShopCtrl.$inject = ['$scope', 'Alert', '$uibModal', 'queryString', 'queryLessorId', 'shopQueryService'];

  function ShopCtrl($scope, Alert, $uibModal, queryString, queryLessorId, queryService) {

    $scope.page = queryService.page;
    $scope.showItem = openItem;

    $scope.$watch('page.current', function (newValue, oldValue) {
      if (newValue === oldValue) {
        return;
      }
      query(newValue);
    });

    activate();

    function activate() {
      var filter = {
        lessorId: queryLessorId,
        text: queryString
      };

      query(1, filter);
    }

    function query(page, filter) {
      queryService.query(page, 8, filter)
        .then(queryCompleted)
        .catch(queryFailed);
    }

    function queryCompleted(res) {
      $scope.items = res.results;
    }

    function queryFailed(res) {
      Alert.error('Fehler beim Laden der Artikel: ' + res.data.message);
    }

    function openItem(item) {
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
    }
  }
})();
