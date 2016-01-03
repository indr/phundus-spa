'use strict';

angular.module('phundusApp')
  .controller('CreateOrderModalInstCtrl', ['$scope', '$uibModalInstance', 'ownerId',
    function ($scope, $uibModalInstance, ownerId) {

      $scope.ok = function () {
        $uibModalInstance.close({ownerId: ownerId, username: $scope.username});
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };
    }
  ]);
