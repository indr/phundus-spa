(function () {
  'use strict';

  angular.module('ph.shop')
    .controller('ShopCtrl', ShopCtrl);

  function ShopCtrl($scope, Alert, shopItemModal, filter, shopQueryService) {

    $scope.page = shopQueryService.page;
    $scope.openItem = openItem;

    $scope.$watch('page.current', function (newValue, oldValue) {
      if (newValue === oldValue) {
        return;
      }
      query(newValue);
    });

    activate();

    function activate() {
      query(1, filter);
    }

    function query(page, filter) {
      shopQueryService.query(page, 8, filter)
        .then(queryCompleted)
        .catch(queryFailed);
    }

    function queryCompleted(res) {
      $scope.items = res.results;
    }

    function queryFailed(res) {
      Alert.error('Fehler beim Laden der Artikel: ' + res.data.message);
    }

    function openItem($event, productId) {
      $event.preventDefault();

      shopItemModal.open({
        itemId: function () {
          return productId;
        }
      })
    }
  }
})();
