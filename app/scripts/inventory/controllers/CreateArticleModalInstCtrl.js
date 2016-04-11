'use strict';

(function () {
  angular.module('phundusApp')
    .controller('CreateArticleModalInstCtrl', ['$scope', '$uibModalInstance', 'ownerId',
      function ($scope, $uibModalInstance, ownerId) {

        $scope.name = '';
        $scope.quantity = 1;

        $scope.ok = function () {
          if (!$scope.form.$valid) {
            return;
          }
          $uibModalInstance.close({ownerId: ownerId, name: $scope.name, quantity: $scope.quantity});
        };

        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };
      }
    ]);
})();
