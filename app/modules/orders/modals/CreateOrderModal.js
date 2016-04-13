'use strict';

(function () {
  angular.module('ph.orders')
    .factory('OrdersCreateOrderModal', CreateOrderModal);

  CreateOrderModal.$inject = ['$uibModal'];

  function CreateOrderModal($uibModal) {
    return {
      open: open
    };

    function open(resolve) {
      var modal = $uibModal.open({
        templateUrl: 'modules/orders/views/modals/create-order.html',
        controller: 'CreateOrderModalInstCtrl',
        resolve: resolve
      });

      return modal.result;
    }
  }


  CreateOrderModalInstCtrl.$inject = ['$scope', '$uibModalInstance', 'lessorId', '$http'];

  function CreateOrderModalInstCtrl($scope, $uibModalInstance, lessorId, $http) {

    $scope.getMembers = function (val) {
      return $http.get('/api/v0/organizations/' + lessorId + '/members', {
        params: {
          username: val
        }
      }).then(function (response) {

        return response.data.results.map(function (item) {
          return item;
        });
      });
    };

    $scope.ok = function () {
      $uibModalInstance.close($scope.selected);
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
})();
