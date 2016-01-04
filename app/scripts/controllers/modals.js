'use strict';

angular.module('phundusApp')
  .controller('AddOrderItemModalInstCtrl', ['$scope', '$uibModalInstance', 'lessorId', 'orderId', 'item',
    function ($scope, $uibModalInstance, lessorId, orderId, item) {

      if (item) {
        $scope.fromUtc = item.fromUtc;
        $scope.toUtc = item.toUtc;
        $scope.amount = item.amount;
      }
      else {
        $scope.fromUtc = new Date();
        $scope.toUtc = new Date();
        $scope.amount = 1;
      }

      $scope.ok = function () {
        if (!$scope.addItemForm.$valid) {
          return;
        }
        $uibModalInstance.close({
          lessorId: lessorId, orderId: orderId, articleId: $scope.articleId,
          fromUtc: $scope.fromUtc, toUtc: $scope.toUtc, amount: $scope.amount
        });
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };
    }
  ]);

angular.module('phundusApp')
  .controller('CreateArticleModalInstCtrl', ['$scope', '$uibModalInstance', 'ownerId',
    function ($scope, $uibModalInstance, ownerId) {

      $scope.name = '';
      $scope.amount = 1;

      $scope.ok = function () {
        if (!$scope.form.$valid) {
          return;
        }
        $uibModalInstance.close({ownerId: ownerId, name: $scope.name, amount: $scope.amount});
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
