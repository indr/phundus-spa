'use strict';

(function () {

  angular.module('phundusApp')
    .controller('ManageOrganizationOrdersCtrl', ['$scope', 'organizationId', 'Orders', 'Alert', '$state', '$uibModal',
      function ($scope, organizationId, Orders, Alert, $state, $uibModal) {
        $scope.organizationId = organizationId;

        Orders.query({organizationId: organizationId}, function (res) {
          $scope.rowCollection = res.results;
          $scope.displayedCollection = [].concat($scope.rowCollection);
        }, function () {
          Alert.error('Fehler beim Laden der Bestellungen.');
        });

        $scope.createOrder = function () {

          var modalInstance = $uibModal.open({
            templateUrl: 'modules/orders/views/modals/create-order.html',
            controller: 'CreateOrderModalInstCtrl',
            resolve: {
              lessorId: function () {
                return $scope.organizationId;
              }
            }
          });

          modalInstance.result.then(function (member) {
            Orders.post({lessorId: $scope.organizationId, lesseeId: member.memberId}, function (data) {
              $state.go('manage.organization.order', {organizationId: organizationId, orderId: data.orderId});
            }, function () {
              Alert.error('Fehler beim Erstellen der Bestellung.');
            });
          });
        };
      }
    ]);

})();
