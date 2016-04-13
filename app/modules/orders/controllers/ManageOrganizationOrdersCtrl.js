'use strict';

(function () {
  angular.module('ph.orders')
    .controller('OrganizationOrdersCtrl', OrganizationOrdersCtrl);

  OrganizationOrdersCtrl.$inject = ['$scope', 'organizationId', 'Orders', 'Alert', '$state', 'OrdersCreateOrderModal'];

  function OrganizationOrdersCtrl($scope, organizationId, Orders, Alert, $state, CreateOrderModal) {
    $scope.organizationId = organizationId;

    Orders.query({organizationId: organizationId}, function (res) {
      $scope.rowCollection = res.results;
      $scope.displayedCollection = [].concat($scope.rowCollection);
    }, function () {
      Alert.error('Fehler beim Laden der Bestellungen.');
    });

    $scope.createOrder = function () {

      var modal = CreateOrderModal.open({
        lessorId: function () {
          return $scope.organizationId;
        }
      });

      modal.then(function (member) {
        Orders.post({lessorId: $scope.organizationId, lesseeId: member.memberId}, function (data) {
          $state.go('organization.order', {organizationId: organizationId, orderId: data.orderId});
        }, function () {
          Alert.error('Fehler beim Erstellen der Bestellung.');
        });
      });
    };
  }
})();
