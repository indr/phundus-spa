(function () {
  'use strict';

  angular.module('ph.shop')
    .controller('ShopItemCtrl', ShopItemCtrl);


  function ShopItemCtrl($scope, itemId, shopItemsResource, shopLessorsResource, Alert, Auth, $uibModalInstance, $state) {
    var lessor = null;

    $scope.isLoading = true;
    $scope.item = null;
    $scope.itemId = itemId;
    $scope.accessLevels = Auth.accessLevels;
    $scope.canEdit = false;
    $scope.canRent = false;
    $scope.close = closeModal;
    $scope.tagClicked = tagClicked;

    shopItemsResource.get({itemId: itemId}, function (res) {
      $scope.item = res;
      $scope.isLoading = false;

      shopLessorsResource.get({lessorId: res.lessor.lessorId}, function (res) {
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


    $scope.hasDocuments = function () {
      return $scope.item && $scope.item.documents.length > 0;
    };

    function closeModal() {
      if (!$uibModalInstance) {
        return;
      }
      $uibModalInstance.dismiss('cancel');
    }

    function tagClicked(tag) {
      closeModal();

      // Go to shop index and search full text with the tag keyword.
      // Problem with this approach is, the query is not visible in the URL.
      $state.go('public.index', {q: tag});
    }
  }
})();
