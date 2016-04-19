(function () {
  'use strict';

  angular.module('ph.organizations')
    .controller('OrganizationOrdersCtrl', OrganizationsOrdersCtrl);

  OrganizationsOrdersCtrl.$inject = ['organizationId', 'Orders', '$state', 'OrdersCreateOrderModal'];

  function OrganizationsOrdersCtrl(organizationId, Orders, $state, CreateOrderModal) {
    var vm = this;
    vm.rowCollection = [];
    vm.displayedCollection = [];
    vm.createOrder = createOrder;

    activate();

    function activate() {
      Orders.query({organizationId: organizationId}, function (res) {
        vm.rowCollection = res.results;
        vm.displayedCollection = [].concat(vm.rowCollection);
      });
    }

    function createOrder() {
      var modal = CreateOrderModal.open({
        lessorId: function () {
          return organizationId;
        }
      });
      modal.then(function (member) {
        Orders.post({lessorId: organizationId, lesseeId: member.memberId}, function (data) {
          $state.go('organization.order', {organizationId: organizationId, orderId: data.orderId});
        });
      });
    }
  }
})();
