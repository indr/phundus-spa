'use strict';

(function () {
  angular.module('ph.shop')
    .controller('ShopItemCtrl', ShopItemCtrl);

  ShopItemCtrl.$inject = ['$scope', 'itemId', 'ShopItems', 'Lessors', 'Alert', 'Auth', '$uibModalInstance'];
  function ShopItemCtrl($scope, itemId, ShopItems, Lessors, Alert, Auth, $uibModalInstance) {
    var lessor = null;

    $scope.isLoading = true;
    $scope.item = null;
    $scope.itemId = itemId;
    $scope.accessLevels = Auth.accessLevels;
    $scope.canEdit = false;
    $scope.canRent = false;

    ShopItems.get({itemId: itemId}, function (res) {
      $scope.item = res;
      $scope.isLoading = false;

      Lessors.get({lessorId: res.lessor.lessorId}, function (res) {
        $scope.lessor = lessor = res;

        $scope.canEdit = (Auth.user.userId === lessor.lessorId) || (Auth.isManager(lessor.lessorId));
        $scope.canRent = lessor.publicRental || Auth.isMember(lessor.lessorId);
      }, function (res) {
        Alert.error('Fehler beim Laden des Vermieters: ' + res.data.message);
      });
    }, function (res) {
      $scope.isLoading = false;
      Alert.error('Fehler beim Laden des Artikels: ' + res.data.message);
    });

    $scope.close = function () {
      if (!$uibModalInstance) {
        return;
      }
      $uibModalInstance.dismiss('cancel');
    };

    $scope.hasDocuments = function () {
      return $scope.item && $scope.item.documents.length > 0;
    };
  }
})();
