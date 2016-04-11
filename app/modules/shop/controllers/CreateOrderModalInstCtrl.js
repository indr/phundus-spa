(function () {

  angular.module('phundusApp')
    .controller('CreateOrderModalInstCtrl', ['$scope', '$uibModalInstance', 'lessorId', '$http',
      function ($scope, $uibModalInstance, lessorId, $http) {

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
    ]);

})();
