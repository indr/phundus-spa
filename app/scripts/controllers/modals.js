'use strict';

angular.module('phundusApp')
  .controller('CreateArticleModalInstCtrl', ['$scope', '$uibModalInstance', 'ownerId',
    function ($scope, $uibModalInstance, ownerId) {

      $scope.name = '';
      $scope.amount = 1;

      $scope.ok = function () {
        if (!$scope.form.$valid) {
          return;
        }
        $uibModalInstance.close({ownerId: ownerId, name: $scope.name, amount: $scope.amonut});
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };
    }
  ]);

angular.module('phundusApp')
  .controller('CreateOrderModalInstCtrl', ['$scope', '$uibModalInstance', 'ownerId', '$http',
    function ($scope, $uibModalInstance, ownerId, $http) {

      $scope.getMembers = function (val) {


        return $http.get('/api/v0/organizations/' + ownerId + '/members', {
          params: {
            username: val
          }
        }).then(function (response) {

          return response.data.map(function (item) {
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
  ]);
